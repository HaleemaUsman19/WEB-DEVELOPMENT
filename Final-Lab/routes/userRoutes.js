const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create User Route
router.post("/create", async(req, res) => {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Name, email, and password are required.");
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error("Error generating salt:", err);
            return res.status(500).send("Internal Server Error");
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Internal Server Error");
            }

            try {
                const user = await userModel.create({
                    name,
                    email,
                    password: hash,
                    age,
                });

                const token = jwt.sign({ email: user.email, role: user.role }, "shhhhhhhhhhhhhh");
                res.cookie("token", token);
                res.redirect("/");
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Login Route
// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const token = jwt.sign({ email: user.email, role: user.role, userId: user._id }, "shhhhhhhhhhhhhh", { expiresIn: "1h" });
            
            // Set the token cookie
            res.cookie("token", token, { httpOnly: true }); // Ensure the cookie is secure
            
            if (user.role === "admin") {
                res.redirect("/admin");
            } else {
                res.redirect("/"); // Or to a page like the user's dashboard or cart page
            }
        } else {
            res.status(400).send("Invalid credentials");
        }
    });
});


// Logout Route
router.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

// Admin Route
router.get("/admin", adminMiddleware, (req, res) => {
    res.render("admin/home");
});

module.exports = router;
