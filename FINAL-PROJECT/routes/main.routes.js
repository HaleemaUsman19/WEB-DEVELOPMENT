const express=require('express');
const router=express.Router();
const categoryModel = require('../models/category'); // Replace with your actual model
const productModel=require("../models/product");


// router.get("/" , (req,res)=>{
//     res.render('index.ejs', {layout: false}); 
// }); 

// Render page with dropdown categories
router.get('/', async (req, res) => {
    try {
        
        const categories = await categoryModel.find(); // Fetch all categories from the database
        res.render('index.ejs', { layout: false,  categories }); // Pass categories to the template
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).send('Error loading categories.');
    }
});



// Route to display products based on category
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


router.get('/product-details/:id', async (req, res) => {
    console.log("meoweifhf");
    // res.send("skhdjsh");
    const productId = req.params.id;

    try {
        // Fetch product from the database using the productId
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const relatedProducts = await productModel.find({ category: product.category, _id: { $ne: productId } }).limit(4);

        // Render the product details page and pass related products
        res.render('product-detail', { layout: false, product,relatedProducts });
    } catch (err) {
        console.error("Error fetching product", err);
        res.status(500).send('Server error');
    }
});



router.get("/login" , (req,res)=>{
    console.log("hello");
    res.render('login.ejs', {layout: false}); 
}); 

router.get("/signup" , (req,res)=>{
    res.render('signup.ejs', {layout: false}); 
}); 

router.get("/category-1" , (req,res)=>{
    res.render('page.ejs', {layout: false}); 
}); 

router.get("/product-details" , (req,res)=>{
    res.render('product-detail.ejs', {layout: false}); 
}); 




module.exports=router;