const mongoose = require("mongoose");

// Here we are creating the schema for profiles in our database
const profileSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    type: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false
    },
    bio: {
      type: String,
      required: false
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Profile",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Profile",
      }
    ],
    incomingRequests: [
      {
        request: Number,
        profileID: mongoose.Schema.Types.ObjectID
      },
    ],
    outgoingRequests: [
      {
        request: Number,
        profileID: mongoose.Schema.Types.ObjectID
      },
    ],
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversations",
      }
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
      }
    ],
    pages: [
      {
        type: String,
        ref: "Pages"
      }
    ]
}, {collection: "Profiles"});

module.exports = mongoose.model("Profile", profileSchema);
// Structure of Schema is further outlined in the Documentation