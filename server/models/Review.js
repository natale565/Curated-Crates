const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    box: {
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionBox',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = model('Review', reviewSchema);
module.exports = Review;