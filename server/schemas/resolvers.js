const { User, SubscriptionBox, Order, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51QG7vwCeKQc4PDCDipKVL3UkOT9CCFdBC2XLgUXLsk6Dj08BWYumopgmowenZU7889jpTwlLAb2PUf3Y3bSiSg7300cMkmHrYu')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) throw new Error('Authentication required');
            return await User.findById(context.user.id);
        },
        getSubscriptionBoxes: async () => await SubscriptionBox.find(),
        getSubscriptionBoxes: async (parent, { id }) => await SubscriptionBox.findById(id),
        getUserOrders: async (parent, { userId }) => await Order.find({ user: userId }).populate('box'),
        getOrder: async (parent, { id }) => await Order.findById(id).populate('box'),
        getBoxReviews: async (parent, { boxId }) => await Review.find({ box: boxId }).populate('user'),
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            await Order.create({ SubscriptionBox: args.SubscriptionBox.map(({ _id }) => _id) });
            const line_items = [];

            for (const product of args.SubscriptioBox) {
                line_items.push({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                            description: product.description,
                            shipping: product.shippingFrequency,
                            items: product.items,
                            images: [`${url}/images/${product.image}`]
                        },
                        unit_amount: product.price * 100,
                    },
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
    },
    Mutation: {
        register: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        addSubscriptionBox: async (parent, { title, description, price, shippingFrequency, items }) => {
            const newBox = await SubscriptionBox.create({ title, description, price, shippingFrequency, items })
                return await newBox.save();
        },
        updateSubscriptionBox: async (parent, { id, ...updates }) => {
            return await SubscriptionBox.findByAndUpdate(id, updates, { new: true });
        },
        deleteSubscriptionBox: async (parent, { id }) => {
            await SubscriptionBox.findByIdAndDelete(id);
            return true
        },
        addOrder: async (parent, { boxId }, context) => {
            if (!context.user) {
                const order = new Order ({ user: context.user.id, box: boxId, startDate: new Date() });
                await User.findByIdAndUpdate(context.user_id, { $push: { orders: order } });
                return order;
            }

            throw AuthenticationError;
        }, 
        updateOrderStatus: async (parent, { id, status }) => {
            return await Order.findByIdAndUpdate(id, { status }, { new: true });
        },
        addReview: async (parent, { boxId, rating, content }, context) => {
            const review = await Review.create({ user: context.user.id, box: boxId , rating, content });
            return review
        }
    }
};

module.exports = resolvers;