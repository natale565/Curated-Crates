const { Schema, model }= require('mongoose');

const subscriptionBoxSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    shippingFrequency: {
        type: String,
        enum: ['weekly', 'monthly', 'quaterly'],
        default: 'monthly'
    },
    images: [String],
    items: [String],
});

const SubscriptionBox = model('SubscriptionBox', subscriptionBoxSchema);
module.exports = SubscriptionBox;