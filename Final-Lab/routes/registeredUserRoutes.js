const express=require('express');
const router=express.Router();
const userModel=require("../models/user");

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find(); // Get all users from the database
        res.render('admin/registeredUser', { users }); // Pass users to the EJS view
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports=router;