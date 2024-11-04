const { User, SubscriptionBox, Order, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51QG7vwCeKQc4PDCDipKVL3UkOT9CCFdBC2XLgUXLsk6Dj08BWYumopgmowenZU7889jpTwlLAb2PUf3Y3bSiSg7300cMkmHrYu');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) throw new AuthenticationError('Authentication required');
            return await User.findById(context.user.id);
        },
        getSubscriptionBox: async (parent, { _id }) => await SubscriptionBox.findById(_id),
        getSubscriptionBoxes: async (parent) => await SubscriptionBox.find(),
        getUserOrders: async (parent, { userId }) => await Order.find({ user: userId }).populate('box'),
        getBoxReviews: async (parent, { boxId }) => await Review.find({ box: boxId }).populate('user'),
    },
    Mutation: {
        register: async (parent, { name, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new AuthenticationError('User already exists');
            }
            const user = await User.create({ name, email, password });
            const token = signToken(user);
            return { token, user: { _id: user._id, name: user.name, email: user.email } };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('User not found');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },
        addSubscriptionBox: async (parent, { name, description, price, shippingFrequency, items }) => {
            const newBox = await SubscriptionBox.create({ name, description, price, shippingFrequency, items });
            return await newBox.save();
        },
        updateSubscriptionBox: async (parent, { id, ...updates }) => {
            return await SubscriptionBox.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteSubscriptionBox: async (parent, { id }) => {
            await SubscriptionBox.findByIdAndDelete(id);
            return true;
        },
        addOrder: async (parent, { boxId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('User not authenticated');
            }
            const order = new Order({ user: context.user.id, box: boxId, startDate: new Date() });
            await order.save();
            return order;
        }, 
        updateOrderStatus: async (parent, { id, status }) => {
            return await Order.findByIdAndUpdate(id, { status }, { new: true });
        },
        addReview: async (parent, { boxId, rating, content }, context) => {
            const review = await Review.create({ user: context.user.id, box: boxId, rating, content });
            return review;
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = await Order.create({ box: args.SubscriptionBox.map(({ _id }) => _id) });
            const line_items = [];

            for (const product of args.SubscriptionBox) {
                line_items.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            description: product.description,
                            images: [`${url}/images/${product.image}`]
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: 1,
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`,
            });

            return { session: session.id };
        },
    }
};

module.exports = resolvers;