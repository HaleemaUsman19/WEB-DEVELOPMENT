const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    // Extract token from cookies
    const token = req.cookies?.token; 
    if (!token) {
      // Redirect to login if the token doesn't exist
      return res.redirect("/login"); 
    }

    // Decode the token and verify its validity
    const decoded = jwt.verify(token, "shhhh");
    
    // Check if the user is an admin
    if (decoded.role !== "admin") {
      return res.status(403).send("Access Denied: Only admins can access this page.");
    }

    // Store decoded information in the request object
    req.user = decoded; 
    
    // Call the next middleware function
    next();
  } catch (error) {
    // Log and handle errors (such as invalid or expired token)
    console.error("Admin Middleware Error:", error.message);
    return res.redirect("/login"); // Redirect to login if error occurs (e.g., invalid token)
  }
};
