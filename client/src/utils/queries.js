import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user{
        user {
            _id
            email
            name
            orders {
                _id
                orderStatus
                createdAt
                subscriptionBoxes {
                    _id
                    name
                    description
                    price
                    shippingFrequency
                    image
                    items
                }
            }
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

export const QUER_REVIEWS = gql`
query reviews($boxId: ID!) {
    reviews(boxId: $boxId) {
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


