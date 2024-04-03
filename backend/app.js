// Import javscript modules
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors');

// Import routes
const user = require("./routes/user.js");
const signup = require("./routes/signup.js");
const signin = require("./routes/signin.js");
const requests = require("./routes/requests.js");
const profile = require("./routes/profile.js");
const posts = require("./routes/posts.js");
const conversation = require("./routes/conversations.js");
const notification = require("./routes/notifications.js")

// For API Documentation, we utilize SWAGGER modules
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');

// Configure the app
const app = express();
// Configure the port (Default if env file is not found is 3000)
const port = process.env.PORT || 3000;

// This is the url for the Database -> Before deploying the app, 
// this url should be stored in some .env file (or some other hidden file), but it should NOT be visible 
// at all after deployment
const dbURI = "mongodb+srv://cindyxie:5NFypnqPyADrUjTi@cluster0.bbjjds3.mongodb.net/myhelix?retryWrites=true&w=majority"

// Function to connect to the database
function connectToDatabase(){
    // Using the mongoose connect method to take in the URI specified above 
    mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to mongodb Database"); // Log to console upon successful connection
    })
    .catch((err) => {
        throw err; // Throw an error if connection is unsuccessful
    })
}

// Create the server and listen for any connections
app.listen(port, () =>{
    connectToDatabase(); // Here we call the connect to database function
    console.log("Our app is running on port", port);
});

// Before we send any requests, we need to enable the middleware
// to parse incoming json data from http requests and to be able to
// parse cookies 
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/user", user);
app.use("/api/signup", signup);
app.use("/api/signin", signin);
app.use("/api/requests", requests);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/conversations", conversation);
app.use("/api/notifications", notification);

// Route to swagger API docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, { explorer: true }));