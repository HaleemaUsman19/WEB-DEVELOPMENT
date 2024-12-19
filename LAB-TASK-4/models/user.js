const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    age: { type: String, required: false },
    role: { type: String, default: "user" },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
