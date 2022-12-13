// Import the required dependencies
const express = require("express");
const jwt = require("jsonwebtoken");

// Create a new Express.js router
const router = express.Router();

// Set up a secret key for signing the JWTs
const jwtSecret = "secret";

// Import the user data from the JSON file
const userData = require("./user_data.json");

// Route for handling user login
router.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  // Look up the user in the fake database by their username
  const user = userData.users.find((u) => u.username === req.body.username);

  // If the user exists and their password is correct, create a JWT for them
  if (user && user.password === req.body.password) {
    const token = jwt.sign({ username: user.username }, jwtSecret, {
      expiresIn: "24h",
    });

    // Set the JWT as a cookie on the response
    const maxAge = 24 * 60 * 60 * 1000; // Store for 24 hours
    res.cookie("token", token, { httpOnly: true, maxAge });

    res.json({ token }); // For other kinds of clients (e.g. a mobile app)
  } else {
    // If the user doesn't exist or their password is incorrect, return an error
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Route for handling requests to the /user endpoint
router.get("/user", (req, res) => {
  const token = (() => {
    const authHeader = req.headers.authorization?.split(" ");
    if (authHeader?.[0].toLowerCase() === "bearer" && authHeader.length === 2) {
      return authHeader[1];
    }
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
  })();

  // Check for the presence of the JWT in the request header
  if (!token) {
    // If the JWT isn't present, return an error
    return res.status(401).json({ error: "Unauthorized" });
  }

  // If the JWT is present, verify it and get the user's username from the payload
  const decoded = jwt.verify(token, jwtSecret);
  const username = decoded.username;

  // Look up the user in the fake database by their username
  const user = userData.users.find((u) => u.username === username);

  // If the user exists, return their data
  if (user) {
    res.json({ data: user.data, username });
  } else {
    // If the user doesn't exist, return an error
    res.status(404).json({ error: "User not found" });
  }
});

// Export the router
module.exports = router;
