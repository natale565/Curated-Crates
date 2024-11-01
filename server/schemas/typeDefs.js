const typeDefs = `
    type User {
        _id: ID
        email: String
        password: String
    }
    
    type SubscriptionBox {
        _id: ID
        name: String
        description: String
        price: Float
        shippingFrequency: String
        images: [String]
        items: [String]
    }

    type Order {
        _id: ID
        user: User
        box: SubscriptionBox
        status: String
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
    }

    type Query {
        me: User   
        getSubscriptionBoxes: [SubscriptionBox]
        getSubscriptionBox(_id: ID!): SubscriptionBox
        getUserOrders(userId: ID): [Order]
        getOrder(_id: ID): Order
        getBoxReviews(boxId: ID): [Review]
        checkout(SubscriptionBox: [SubscriptionBoxInput]): Checkout

    }

    type Mutation {
        register(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addSubscriptionBox(title: String!, description: String!, price: Float!, shippingFrequency: String!, items:[String]): SubscriptionBox
        updateSubscriptionBox(id: ID!, title: String, description: String, price: Float, shippingFrequency: String, items: [String]): SubscriptionBox
        deleteSubscriptionBox(id: ID!): Boolean
        addOrder(boxId: ID): Order
        updateOrderStatus(id: ID, status: String): Order
        addReview(boxId: ID, rating: Int, content: String): Review
    }
`;

module.exports = typeDefs;