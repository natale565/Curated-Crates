import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;


export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token 
            user {
              _id
            }
        }
    }
`;

export const ADD_ORDER= gql`
    mutation addOrder($boxIds: [ID!]!) {
        addOrder(boxId: $boxIds) {
            _id
            status
            box {
                _id
                title
                description
                price
                shippingFrequency
                items
            }
        }
    }
`;

export const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
        _id
        status    
    }
}
`;

export const ADD_REVIEW = gql`
    mutation addReview($boxId: ID!, $rating: Int!, $content: String!) {
        addReview(boxId: $boxId, rating: $rating, content: $content) {
            _id
            rating
            content
            user {
                _id
            }   
        }  
    }
`;

export const ADD_SUBSCRIPTION_BOX = gql `
mutation addSubscriptionBox(
    $title: String!,
    $description: String!,
    $price: Float!,
    $shippingFrequency: String!,
    $items: [String]
) {
    addSubscriptionBox(
        title: $title,
        description: $description,
        price: $price,
        shippingFrequency: $shippingFrequency,
        items: $items
    ) {
        _id
        title
        price
    }
}
`;

export const UPDATE_SUBSCRIPTION_BOX = gql `
mutation updateSubscriptionBox(
    $id: ID!,
    $title: String,
    $description: String,
    $price: Float,
    $shippingFrequency: String,
    $items: [String]
) {
    updateSubscriptionBox(
        id: $id,
        title: $title,
        description: $description,
        price: $price,
        shippingFrequency: $shippingFrequency,
        items: $items
    ) {
        _id
        title
        description
        price
    }
}
`;

export const DELETE_SUBSCRIPTION_BOX = gql`
mutation deleteSubscriptionBox($id: ID!) {
    deleteSubscriptionBox(id: $id)
}
`;
