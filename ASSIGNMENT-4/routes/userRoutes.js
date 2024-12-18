const express=require('express');
const router=express.Router();
const userModel=require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.get("/" , (req,res)=>{
    res.render('index');
});

router.post("/create" ,  (req,res)=>{
    const {name,email,password , age} = req.body;

    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password , salt , async (err,hash)=>{
            let c = await userModel.create({
                name,
                email,
                password:hash,
                age,
            })

            let token= jwt.sign( {email}, "shhhhhhhhhhhhhh");
            res.cookie("token", token);
            res.send(c);
        })
    });

});

router.get("/login" ,  (req,res)=>{
    res.render('login');
})

router.post("/login" , async (req,res)=>{
    let user= await userModel.findOne({email: req.body.email});
    if(!user) return res.send("something is wrong");

    bcrypt.compare(req.body.password , user.password , (err,result)=>{
        if(result){
            let token= jwt.sign( {email: user.email}, "shhhhhhhhhhhhhh");
            res.cookie("token", token);
            res.send("Yes you can login");
        }
        else {
            res.send("NO, You cannot login")
        };
    })

})

router.get("/logout", (req, res)=>{
    res.cookie("token", "");
    res.redirect("/");
})

module.exports=router;