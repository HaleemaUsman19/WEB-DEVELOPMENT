// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: { type: String, required: true },
    customer_name: { type: String, required: true },
    customer_address: { type: String, required: true },
    order_items: { type: String, required: true },
    order_total: { type: Number, required: true },
    order_date: { type: Date, required: true },
    payment_method: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
