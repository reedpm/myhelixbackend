/**
 * Comment is for swagger documentation / defining the User schema
 * 
 * @swagger 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user-provided email that was used to create an account
 *         password:
 *           type: string
 *           description: The respective hashed password
 *         personalProfile:
 *           type: object
 *           description: The object ID of the personal Profile linked to this user
 *         publicProfile:
 *           type: object
 *           description: The object ID of the public Profile linked to this user
 *         blocked:
 *           type: array
 *           description: An array of user IDs that have been blocked (Any blocks to a profile, regardless of whether it is personal or public, will lead to the entire user being blocked)
 */

const mongoose = require("mongoose");

// Here we are creating the schema for user information in our database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    personalProfile: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Profiles",
        required: false,
    },
    publicProfile: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Profiles",
        required: false,
    },
    blocked: [
        { 
            type: mongoose.Schema.Types.ObjectID, 
            ref: "Users", 
        }
    ],
},  { collection: 'Users' });

module.exports = mongoose.model("Users", userSchema);
// Structure of User schema will be outlined in the Documentation