const express = require("express");
const path = require('path');
const connectDB= require("./db");
const expressLayout= require("express-ejs-layouts");
const session = require('express-session');
const cookieParser = require('cookie-parser'); // Corrected here

const app =express();

// Middleware for session management
app.use(cookieParser());
app.use(session({
    secret: 'shhhhhhhhhhh',  // Secret for session encryption
    resave: false,           // Don't resave session if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: { secure: false } // `true` if using HTTPS, `false` for development
}));


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
const cartRoutes =require("./routes/cartRoutes");


app.use("/" , mainRoutes);
app.use("/main/categories" , mainCategoryRoutes);
app.use("/main/products" , mainProductRoutes);
app.use("/admin/category" , CategoryRoutes);
app.use("/admin/product" ,ProductsRoutes );
app.use("/user" ,userRoutes );
app.use("/admin" ,adminRoutes );
app.use("/admin/user" ,registeredUserRoutes );
app.use("/add-to-cart" ,cartRoutes );

// const siteMiddleware = require('./middleware/siteMiddleware');
// app.use(siteMiddleware);

// app.get("/" , (req,res)=>{
//     res.render('index.ejs', {layout: false}); 
// }); 


app.get("/admin" , (req,res)=>{
    
    res.render('admin/home'); 
}); 


// app.get("/admin" , (req,res)=>{
//     res.render('admin/home'); 
// }); 


const port =  5010;



const startServer = async()=> {
    await connectDB();

    app.listen(port , ()=>{
        console.log(`Server started at http://localhost:${port}`);
    })
}

startServer();