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
        name: "Monthly Coffee Box",
        description: "A box of premium coffee beans from around the world.",
        price: 39.99,
        shippingFrequency: 'monthly',
        items: ["Columbian Coffee-Huila", "Ethopian Coffee-Yirgacheffe Region", "Kenyan-Arabica"],
        image: 'coffee-box.jpg'
    },
    {
        name: "Gourmet Snack Box",
        description: "A variety of gourmet snacks for your enjoyment.",
        price: 29.99,
        shippingFrequency: 'monthly',
        items: ["Artisan Potato Chips", "Organic Dried Fruits", "80% Cocoa Premium Dark Chocolate"],
        image: 'snack-box2.jpg'
    },
    {
        name: "Artisan Wine Box",
        description: "Three bottles of artisan wine from around the world.",
        price: 79.99,
        shippingFrequency: 'monthly',
        items: ["2018 Chardonnay", "2017 Cabernet Sauvignon", "2019 Pinot Noir"],
        image: 'wine-box.jpg'
    },
    {
        name: "Women's Beauty Box",
        description: "Demure, elegant, and sophisticated beauty products.",
        price: 49.99,
        shippingFrequency: 'monthly',
        items: [ "Fragrance", "Skincare", "Makeup"],
        image: 'womens-box.jpg'
    },
    {
        name: "Mens Grooming Box",
        description: "Items to keep you looking sharp and feeling great.",
        price: 49.99,
        shippingFrequency: 'monthly',
        items: [ "Shaving Cream", "Aftershave", "Beard Oil"],
        image: 'mens-box.jpg'
    },
    {
        name: "Dog Lovers Box",
        description: "Don't forget about your furry friend!",
        price: 24.99,
        shippingFrequency: 'monthly',
        items: [ "Stuffed Toys", "Treats", "Leash"],
        image: 'dog-box.jpg'
    },
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