import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
query me {
    me {
        _id
        email
        name
    }
}
`;

export const GET_SUBSCRIPTION_BOXES = gql`
query getSubscriptionBoxes {
    getSubscriptionBoxes {
        _id
        name
        description
        price
        shippingFrequency
        image
        items
    }
}
`;

export const GET_SUBSCRIPTION_BOX = gql`
query getSubscriptionBox($_id: ID!) {
    getSubscriptionBox(_id: $_id) {
        _id
        name
        description
        price
        shippingFrequency
        image
        items
    }
}
`;

export const GET_USER_ORDERS = gql`
query getUserOrders($userId: ID) {
    getUserOrders(userId: $userId) {
        _id
        boxes {
            _id
            name
        }
        status
        createdAt
    }
}
`;

export const GET_BOX_REVIEWS = gql`
query getBoxReviews($boxId: ID!) {
    getBoxReviews(boxId: $boxId) {
        _id
        user {
            _id
            email
        }
        rating
        content
        createdAt
    }
}
`;


