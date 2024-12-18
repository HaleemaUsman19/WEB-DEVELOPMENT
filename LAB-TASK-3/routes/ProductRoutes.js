const express=require('express');
const router=express.Router();
const categoryModel=require("../models/category");
const productModel=require("../models/product");





// Route to render the add product form
router.get("/add", async (req, res) => {
    const category = await categoryModel.find();
    res.render('admin/products/add' , {category});  
});

router.get("/read", async (req, res) => {
    try {
        const product = await productModel.find().populate('category');
        res.render('admin/products/read', { product }); // Rnder the view
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send("An error occurred while fetching products."); // Respond with error message
    }
});

router.post('/create', async (req, res) => {
    try {
        const { name, description, price, quantity,category} = req.body; // Extract data from request body
        await productModel.create({
            name,
            description,
            price,
            quantity,
            category,
        }); 
        res.redirect("/admin/product/read"); // Redirect to the read page
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).send("An error occurred while creating the product."); // Respond with error message
    }
});

router.get("/delete/:id" , async (req,res) => {
    
    await productModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/admin/product/read");

})

router.get("/edit/:id", async (req, res) => {
    try {
        const product = await productModel.findOne({_id:req.params.id}).populate('category'); 
        const category = await categoryModel.find();
        res.render('admin/products/edit', { product,category }); // Render the view
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send("An error occurred while fetching products."); // Respond with error message
    }
});

router.post("/update/:id" , async (req,res) => {
    const {name,description,price,quantity,category} = req.body;
    await productModel.findOneAndUpdate({_id: req.params.id}, {name,description,price,quantity, category}, {new:true});
    res.redirect("/admin/product/read");
})

// router.get("/admin/product/read" ,  async(req,res)=>{
//     res.render('admin/products/read');
// })


// router.get('/admin/product/read' , async (req, res)=> {
//     let users = await productModel.find();
//     res.render("read", {users});
//  })











// router.post('/admin/product/create', async (req, res) => {

//     console.log(req.body);
//     let { name, description, quantity } = req.body;
    
//         let newproduct= await productModel.create({
//             name,
//             description,
//             quantity
//         });
//         res.send(newproduct)
//         console.log(newproduct);
   
// });















// router.get('admin/category/:categoryName' , async (req,res)=>{
//     const categoryName= req.params.categoryName;

//     const categoryProducts = await Product.find({category : category._id});

//     res.render('admin/category/read-category' , {
//         categoryName,
//         products: categoryProducts
//     }); 
// });



// router.get("/admin/products/create" , (req, res)=>{
//     res.render("admin/products/create")
// })

module.exports=router;