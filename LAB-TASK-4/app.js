const express = require("express");
const path = require('path');
const connectDB= require("./db");
const expressLayout= require("express-ejs-layouts");
const session = require('express-session');

const app =express();


require('dotenv').config();
const port = process.env.PORT || 5010;


const cookieParser = require("cookie-parser");
const cookieSecret = 'shhhhhhhh';
app.use(cookieParser(cookieSecret)); 

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(expressLayout);

// View engine setup
app.set('view engine', 'ejs');


//Routes
const CategoryRoutes=require("./routes/CategoryRoutes");
const ProductsRoutes=require("./routes/ProductRoutes");


app.use("/admin/category" , CategoryRoutes);
app.use("/admin/product" ,ProductsRoutes );



app.get("/" , (req,res)=>{
    res.render('index.ejs', {layout: false}); 
}); 


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