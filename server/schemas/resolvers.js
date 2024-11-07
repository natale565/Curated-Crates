const { User, SubscriptionBox, Order, Review } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51QG7vwCeKQc4PDCDipKVL3UkOT9CCFdBC2XLgUXLsk6Dj08BWYumopgmowenZU7889jpTwlLAb2PUf3Y3bSiSg7300cMkmHrYu');


const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id)
                    .populate({
                        path: 'orders',
                        strictPopulate: false, 
                        populate: {
                            path: 'subscriptionBoxes',
                            strictPopulate: false, 
                            model: 'SubscriptionBox'
                        }
                    });
        
                return user;
            }
            throw new AuthenticationError('Authentication required');
        },
        
        getSubscriptionBox: async (parent, { _id }) => await SubscriptionBox.findById(_id),
        getSubscriptionBoxes: async (parent) => await SubscriptionBox.find(),
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate
                ({
                    path: 'orders.subscriptionBoxes',
                    model: 'SubscriptionBox'
                });

                const order = user.orders.id(_id);
                return order;
            }

            throw AuthenticationError
        },
        reviews: async (parent, { boxId }) => await Review.find({ box: boxId }).populate('user'),
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
            const url = context.headers?.referer ? new URL(context.headers.referer).origin : 'http://localhost:3001';        
            const order = await Order.create({ 
            user: context.user._id,
            subscriptionBoxes: args.subscriptionBoxes.map(({ _id }) => _id),
        });
        const line_items = [];

        for (const subscriptionBox of args.subscriptionBoxes) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: subscriptionBox.name,
                        description: subscriptionBox.description,
                        images: [`${url}/images/${subscriptionBox.image}`]
                    },
                    unit_amount: Math.round(subscriptionBox.price * 100),
                },
                quantity: subscriptionBox.purchaseQuantity,
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