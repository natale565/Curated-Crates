const typeDefs = `
    type User {
        _id: ID
        name: String
        email: String
        password: String
        orders: [Order]
    }
    
    type SubscriptionBox {
        _id: ID
        name: String
        description: String
        price: Float
        shippingFrequency: String
        image: String
        items: [String]
    }

    type Order {
        _id: ID
        user: User
        subscriptionBoxes: [SubscriptionBox]
        orderStatus: String
        startDate: String
        endDate: String
        createdAt: String
    }

    type Review {
        _id: ID
        user: User
        box: SubscriptionBox
        rating: Int
        content: String
        createdAt: String
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }
    
    input SubscriptionBoxInput {
        _id: ID
        name: String
        description: String
        price: Float
        shippingFrequency: String
        items: [String]
        image: String
        purchaseQuantity: Int
    }

    type Query {
        user: User   
        getSubscriptionBoxes: [SubscriptionBox]
        getSubscriptionBox(_id: ID!): SubscriptionBox
        reviews(boxId: ID): [Review]
        order(_id: ID!): Order
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addSubscriptionBox(name: String!, description: String!, price: Float!, shippingFrequency: String!, items:[String]): SubscriptionBox
        updateSubscriptionBox(id: ID!, name: String, description: String, price: Float, shippingFrequency: String, items: [String]): SubscriptionBox
        deleteSubscriptionBox(id: ID!): Boolean
        addOrder(boxId: ID): Order
        updateOrderStatus(id: ID, status: String): Order
        addReview(boxId: ID, rating: Int, content: String): Review
        checkout(subscriptionBoxes: [SubscriptionBoxInput]): Checkout

    }
`;

module.exports = typeDefs;