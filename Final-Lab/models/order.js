const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    customer: {
        name: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: String, required: true },
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;