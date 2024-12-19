const express = require('express');
const router = express.Router();
const categoryModel = require('../models/category'); // Replace with your actual model
const productModel = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const categories = await categoryModel.find(); // Fetch all categories from the database
        res.render('category', { layout: false, categories }); // Pass categories to the template
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send('Error loading categories.');
    }
});

router.get('/category/:categoryName', async (req, res) => {
    try {
        const categoryName = req.params.categoryName; // Get category name from URL
        const category = await categoryModel.findOne({ name: categoryName }); // Fetch the category from the database
        if (!category) {
            return res.status(404).send('Category not found');
        }

        // Fetch products associated with this category
        const products = await productModel.find({ category: category._id });

        // Render the page and pass the category and products
        res.render('category', { layout: false, category, products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).send('Error loading category products.');
    }
});

module.exports = router;
