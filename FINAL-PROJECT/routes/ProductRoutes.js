const express = require('express');
const router = express.Router();
const categoryModel = require("../models/category");
const productModel = require("../models/product");
const path = require('path');
const fs = require("fs");
const upload = require("../config/multerconfig");

// Route to render the add product form
router.get("/add", async (req, res) => {
    const category = await categoryModel.find();
    res.render('admin/products/add', { category });
});

router.get("/read", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
        const limit = 5;  // Number of products per page
        const skip = (page - 1) * limit;  // Number of products to skip

        // Get total count of products to calculate total pages
        const totalProducts = await productModel.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        // Fetch paginated products
        const products = await productModel.find()
            .skip(skip)
            .limit(limit)
            .populate('category');

        // Render the view with paginated products
        res.render('admin/products/read', {
            products,
            page,
            totalPages,
            pageTitle: "Product List" // Optional title for the page
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send("An error occurred while fetching products.");
    }
});

router.post('/create', upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        const image = req.file ? req.file.filename : null;
        await productModel.create({
            name,
            description,
            image,
            price,
            quantity,
            category,
        });
        res.redirect("/admin/product/read");
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).send("An error occurred while creating the product.");
    }
});

router.get("/delete/:id", async (req, res) => {
    await productModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/admin/product/read");
});

router.get("/edit/:id", async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.id }).populate('category');
        const category = await categoryModel.find();
        res.render('admin/products/edit', { product, category });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send("An error occurred while fetching products.");
    }
});

router.post("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Find the existing product
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found.");
        }

        // Prepare the updated data
        const updateData = { name, description, price, quantity, category };
        if (image) {
            // Delete the old image if a new image is uploaded
            if (product.image) {
                const oldImagePath = path.join(__dirname, "../public/images/uploads", product.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Delete the old image
                }
            }
            updateData.image = image; // Update to the new image
        }

        // Update the product
        await productModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.redirect("/admin/product/read");
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).send("An error occurred while updating the product.");
    }
});

// Combine search and pagination functionality into a single route
router.get('/search', async (req, res) => {
    const query = req.query.query || '';  // Get the search query from the URL parameters
    const page = parseInt(req.query.page) || 1;  // Get the page number from the URL parameters
    const limit = 10;  // Number of products per page
    const skip = (page - 1) * limit;  // Calculate skip value

    try {
        // Search products based on the query
        const products = await productModel.find({ name: { $regex: query, $options: 'i' } })
            .skip(skip)
            .limit(limit)
            .populate('category');

        // Get the total count of matching products
        const totalCount = await productModel.countDocuments({ name: { $regex: query, $options: 'i' } });
        const totalPages = Math.ceil(totalCount / limit);

        // Render the products with pagination and the search query
        res.render('admin/products/read', {
            products,
            query,              // Pass the query parameter to the view
            page,               // Pass current page
            totalPages,         // Pass total pages for pagination
            pageTitle: "Product List"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving products');
    }
});

module.exports = router;
