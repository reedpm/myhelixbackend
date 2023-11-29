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