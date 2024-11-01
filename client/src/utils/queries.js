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
        title
        description
        price
        shippingFrequency
        images
        items
    }
  }
`;

export const GET_SUBSCRIPTION_BOX = gql`
query getSubscriptionBox($_id: ID!) {
    get SubscriptionBox(_id: $_id) {
       _id
       title
       description
       price
       shippingFrequency
       images
       items
    }
}
`;

export const GET_USER_ORDERS = gql `
query getUserOrders($userId: ID) {
    getUserOrders(userId: $userId) {
        _id
        box {
           _id
           title
         }
        status
        createdAt
    }
}
`;

export const GET_ORDER = gql`
query getOrder($_id: ID!) {
    _id
    user {
      _id
      name
    }
    box {
      _id
      title
      description
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

export const CHECKOUT = gql`
    mutation checkout($SubscriptionBox: [SubscriptionBoxInput]) {
      checkout(SubscriptionBox: $SubscriptionBox) {
         session
      } 
    }
`;