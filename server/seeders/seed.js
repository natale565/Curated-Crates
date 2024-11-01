require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, SubscriptionBox, Order, Review } = require('../models');
const { users, subscriptionBoxes, orders, reviews } = require('./data');

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected!');

        await User.deleteMany({});
        await SubscriptionBox.deleteMany({});
        await Order.deleteMany({});
        await Review.deleteMany({});
        console.log('Old data deleted!');

        const userPromises = users.map(async (user) => {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
            return User.create(user)
        });
        const savedUsers = await Promise.all(userPromises);
        console.log('Users created!');

        const savedBoxes = await SubscriptionBox.insertMany(subscriptionBoxes);
        console.log('Subscription boxes created!');

        const orderPromises = orders.map(order => {
            return Order.create({
                user: savedUsers[order.userIndex]._id,
                box: savedBoxes[order.boxIndex]._id,
                status: order.status,
                startDate: order.startDate,
                endDate: order.endDate
            });
        });

        await Promise.all(orderPromises);
        console.log('Orders created!');

        const reviewPromises = reviews.map((review) => {
            return Review.create({
                user: savedUsers[review.userIndex]._id,
                box: savedBoxes[review.boxIndex]._id,
                rating: review.rating,
                content: review.content
            });
        });
        await Promise.all(reviewPromises);
        console.log('Reviews created!');
        
        console.log('Database seeded complete!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
            console.log('Database connection closed.')
        };
};


seedDatabase();