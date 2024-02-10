/**
 * Comment is for swagger documentation / defining the page schema
 * 
 * @swagger 
 * components:
 *   schemas:
 *     Pages:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name/category of a page
 *         topPosts:
 *           type: array
 *           description: An array of the top posts in relation to the page
 *         recentPosts:
 *           type: array
 *           description: An array of the most recent posts in relation to the page
 */


const mongoose = require("mongoose");

// Here we are creating the schema for profiles in our database
const pageSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    // This will be used to maintain the top posts for that page
    topPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts",
        }
    ],
    // This will be used to maintain the most recent posts for that page
    recentPosts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Posts",
        }
    ],
}, {collection: "Pages"});

module.exports = mongoose.model("Pages", pageSchema);
// Structure of Schema is further outlined in the Documentation