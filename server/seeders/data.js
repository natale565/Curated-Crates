const users = [
    {
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123'
    },
    {
        name: 'Jane Smith',
        email: 'jane@test.com',
        password: 'password123'
    }
];

const subscriptionBoxes = [
    {
        name: 'Monthly Coffee Box',
        description: 'A box of premium coffee beans from around the world.',
        price: 39.99,
        shippingFrequency: 'monthly',
        items: ['Columbian Coffee-Huila', 'Ethopian Coffee-Yirgacheffe Region', 'Kenyan-Arabica '],
        images: 'coffee-subscription.jpeg'
    },
    {
        name: 'Gourmet Snack Box',
        description: 'A variety of gourmet snacks for your enjoyment.',
        price: 29.99,
        shippingFrequency: 'monthly',
        items: ['Artisan Potato Chips, Organic Dried Fruits, 80% Cocoa Premium Dark Chocolate'],
        images: 'snack-box.jpeg'
    }
];

const orders = [
    {
        userIndex: 0,
        boxIndex: 0,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth()+1))
    },
    {
        userIndex: 0,
        boxIndex: 0,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth()+1))
    }
];

const reviews = [
    {
        userIndex: 0,
        boxIndex: 0,
        rating: 5,
        content: 'The coffee is great! I love the variety each month!'
    },
    {
        userIndex: 1,
        boxIndex: 1,
        rating: 4,
        content: 'Great snacks, but I would love to see more options.'
    }
]

module.exports = { users, subscriptionBoxes, orders, reviews };