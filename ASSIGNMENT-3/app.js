const express = require("express");
const path = require('path');


const app =express();


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(expressLayout);

// View engine setup
app.set('view engine', 'ejs');



const siteMiddleware = require('./middleware/siteMiddleware');
app.use(siteMiddleware);

// app.get("/" , (req,res)=>{
//     res.render('index.ejs', {layout: false}); 
// }); 




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