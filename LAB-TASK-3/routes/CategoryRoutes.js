const express=require('express');
const router=express.Router();
const categoryModel=require("../models/category");

router.get("/add" , (req,res)=>{
    // res.send("dnsf0");
    res.render("admin/categories/add");
});

router.get("/read" , async (req,res)=>{
   const category = await categoryModel.find();
    res.render("admin/categories/read" , {category});
});

router.post("/create" , async (req,res)=>{
    const {name, description} = req.body;

    await categoryModel.create({
        name, description,
    });
    res.redirect("/admin/category/read");
});

router.get("/delete/:id" , async (req,res) => {
    await categoryModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/admin/category/read");

});

router.get("/edit/:id" , async (req,res) => {
    let category= await categoryModel.findOne({_id: req.params.id});
    res.render("admin/categories/edit", {category});

});

router.post("/update/:id" , async (req,res)=>{
    const {name, description} = req.body;
    await categoryModel.findOneAndUpdate({_id: req.params.id}, {name,description} , {new:true});
    res.redirect("/admin/category/read");
});

// router.post("/update/:id" , async (req,res) => {
//     const {name,description,price,quantity} = req.body;
//     await productModel.findOneAndUpdate({_id: req.params.id}, {name,description,price,quantity}, {new:true});
//     res.redirect("/admin/product/read");
// })


module.exports=router;