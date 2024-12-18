const express = require("express");
const path = require('path');
const connectDB= require("./db");
// const expressLayout= require("express-ejs-layouts");
const cookieParser = require('cookie-parser');

require('dotenv').config();
const port = process.env.PORT || 5000;

const app =express();


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
// app.use(expressLayout);
app.use(cookieParser());

// View engine setup
app.set('view engine', 'ejs');




const userRoutes=require("./routes/userRoutes");
app.use("/" , userRoutes);



const startServer = async()=> {
    await connectDB();

    app.listen(port , ()=>{
        console.log(`Server started at http://localhost:${port}`);
    })
}

startServer();