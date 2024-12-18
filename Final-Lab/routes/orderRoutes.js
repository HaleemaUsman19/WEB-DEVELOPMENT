const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Product = require('../models/product');  // Assuming you have a Product model
const User = require('../models/user');        // Assuming you have a User model

router.get('/order', (req, res) => {
    res.render('order', {layout:false});
});

router.post('/submit_order', (req, res) => {
    const { customer_name, customer_address, order_items, order_total, paymentMethod } = req.body;

    const newOrder = new Order({
        customer_name,
        customer_address,
        order_items,
        order_total,
        payment_method: paymentMethod,
    });

    newOrder.save()
        .then(() => {
            res.send('Order submitted successfully');
        })
        .catch(err => {
            console.log(err);
            res.send('Error saving order');
        });
});

module.exports=router;
