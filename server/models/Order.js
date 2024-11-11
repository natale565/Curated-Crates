const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionBoxes: [
        { 
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionBox',
        required: true,
    }
    ],
    orderStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = model('Order', orderSchema);
module.exports = Order;