const express = require("express");
const path = require('path');
const connectDB= require("./db");
const expressLayout= require("express-ejs-layouts");

require('dotenv').config();
const port = process.env.PORT || 5010;

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
const mainRoutes=require("./routes/main.routes");
const mainCategoryRoutes=require("./routes/mainCategoryRoutes");
const mainProductRoutes=require("./routes/mainProductRoutes");
const CategoryRoutes=require("./routes/CategoryRoutes");
const ProductsRoutes=require("./routes/ProductRoutes");
const userRoutes=require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes");
const registeredUserRoutes =require("./routes/registeredUserRoutes");


app.use("/" , mainRoutes);
app.use("/main/categories" , mainCategoryRoutes);
app.use("/main/products" , mainProductRoutes);
app.use("/admin/category" , CategoryRoutes);
app.use("/admin/product" ,ProductsRoutes );
app.use("/user" ,userRoutes );
app.use("/admin" ,adminRoutes );
app.use("/admin/user" ,registeredUserRoutes );

const siteMiddleware = require('./middleware/siteMiddleware');
app.use(siteMiddleware);

// app.get("/" , (req,res)=>{
//     res.render('index.ejs', {layout: false}); 
// }); 


app.get("/admin" , (req,res)=>{
    
    res.render('admin/home'); 
}); 


// app.get("/admin" , (req,res)=>{
//     res.render('admin/home'); 
// }); 




const startServer = async()=> {
    await connectDB();

    app.listen(port , ()=>{
        console.log(`Server started at http://localhost:${port}`);
    })
}

startServer();