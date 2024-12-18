const express = require("express");
const path = require('path');
const connectDB= require("./db");
const expressLayout= require("express-ejs-layouts");

require('dotenv').config();
const port = process.env.PORT || 5000;

const app =express();


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(expressLayout);

// View engine setup
app.set('view engine', 'ejs');


//Routes
const ProductsRoutes=require("./routes/ProductRoutes");
app.use("/admin/product" ,ProductsRoutes );

const CategoryRoutes=require("./routes/CategoryRoutes");
app.use("/admin/category" , CategoryRoutes);

app.get("/admin" , (req,res)=>{
    res.render('admin/home'); 
}); 


const startServer = async()=> {
    await connectDB();

    app.listen(port , ()=>{
        console.log(`Server started at http://localhost:${port}`);
    })
}

startServer();