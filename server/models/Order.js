const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    box: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionBox',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'paused', 'cancelled'],
        default: 'active'
    },
    startDate: {
        type: Data,
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