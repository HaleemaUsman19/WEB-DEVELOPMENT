const express=require('express');
const router=express.Router();

router.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.render("admin/logout" , {layout:false});
    
});

module.exports=router;