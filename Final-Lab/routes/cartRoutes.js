const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const Product = require("../models/product");
const Order = require('../models/order');
const { v4: uuidv4 } = require('uuid');

router.use(cookieParser());

// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Proceed to the next middleware if logged in
    } else {
        res.redirect('/login'); // Redirect to login page if not logged in
    }
}

// POST: Place Order
router.post('/place-order', async (req, res) => {
    const { name, street, city, postalCode } = req.body;
    const cart = req.session.cart || [];

    // Log cart data to ensure it's populated
    console.log('Cart Data:', cart);

    if (cart.length === 0) {
        return res.status(400).send('Cart is empty');
    }

    // Generate a unique Order ID
    const orderId = uuidv4();

    // Calculate total price
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create the order object
    const order = new Order({
        orderId,
        customer: {
            name,
            address: {
                street,
                city,
                postalCode,
            }
        },
        items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        totalAmount,
        orderDate: new Date().toLocaleString(), // Current timestamp
    });

    try {
        // Log the order data to check if it's properly created
        console.log('Order data:', order);

        // Save the order in the database
        await order.save();

        // Log success message
        console.log('Order saved successfully!');

        // Clear the cart after the order is placed
        req.session.cart = [];

        // Redirect to order success page
        res.redirect('/add-to-cart/order-success');
    } catch (error) {
        // Log any errors that occur during order saving
        console.error('Error placing order:', error);
        res.status(500).send('Error placing order');
    }
});

// GET: Order Success Page
router.get('/order-success', (req, res) => {
    res.render('orderSuccess', { message: 'Order placed successfully!' , layout: false });
});

// POST: Add Item to Cart
router.post('/order123', (req, res) => {
    const { id, name, price, quantity, image } = req.body;
    console.log('Received Cart Item:', { id, name, price, quantity, image });

    const cart = req.session.cart || []; // Retrieve existing cart from session

    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity, 10); // Update quantity
    } else {
        cart.push({ 
            id, 
            name, 
            price, 
            quantity: parseInt(quantity, 10),
            image 
        });
    }

    req.session.cart = cart; // Save the updated cart to session
    res.redirect('/add-to-cart/cart-details');
});

// GET: Cart Details
router.get('/cart-details', async (req, res) => {
    const cart = req.session.cart || [];

    // Fetch product details from the database and add it to each item in the cart
    const cartItemsWithDetails = await Promise.all(
        cart.map(async (item) => {
            const product = await Product.findById(item.id); // Fetch product by ID
            if (product) {
                item.image = product.image; // Add the image to the cart item
                item.name = product.name;   // Add the name to the cart item
                item.price = product.price; // Add the price to the cart item
            }
            return item;
        })
    );

    const totalAmount = cartItemsWithDetails.reduce((sum, item) => sum + item.price * item.quantity, 0); // Calculate total

    // Render the cart details view
    res.render('cartDisplay', { cartItems: cartItemsWithDetails, totalAmount , layout: false  });
});

// Admin route to display orders
router.get('/admin/orders', async (req, res) => {
    try {
        // Fetch all orders sorted by orderDate in descending order
        const orders = await Order.find().sort({ orderDate: -1 });

        // Render the orders in the adminOrders view
        res.render('adminOrders', { orders } , {layout: false} );
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Error fetching orders');
    }
});


// POST: Clear Cart
router.post('/clear-cart', isAuthenticated, (req, res) => {
    req.session.cart = []; // Clear cart from session
    res.redirect('/cart-details'); // Redirect to cart details after clearing
});

module.exports = router;
