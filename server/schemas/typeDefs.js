const typeDefs = `
    type User {
        _id: ID
        email: String
        password: String
    }
    
    type SubscriptionBox {
        id: ID
        title: String
        description: String
        price: Float
        shippingFrequency: String
        images: [String]
        items: [String]
    }

    type Order {
        id: ID
        user: User
        box: SubscriptionBox
        status: String
        startDate: String
        endDate: String
        createdAt: String
    }

    type Review {
        id: ID
        user: User
        box: SubscriptionBox
        rating: Int
        content: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User   
        getSubscriptionBoxes: [SubscriptionBox]
        getSubscriptionBox(id: ID!): SubscriptionBox
        getUserOrders(userId: ID): [Order]
        getOrder(id: ID): Order
        getBoxReviews(boxId: ID): [Review]
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addSubscriptionBox(title: String!, description: String!, price: Float!, shippingFrequency: String!, items:[String]): SubscriptionBox
        updateSubscriptionBox(id: ID!, title: String, description: String, price: Float, shippingFrequency: String, items: [String]): SubscriptionBox
        deleteSubscriptionBox(id: ID!): Boolean
        createOrder(boxId: ID): Order
        updateOrderStatus(id: ID, status: String): Order
        addReview(boxId: ID, rating: Int, content: String): Review

    }
`;

module.exports = typeDefs;