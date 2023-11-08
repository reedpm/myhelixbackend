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
        type: String,
        ref: "Profile",
        required: false
      },
    ],
    following: [
      {
        type: String,
        ref: "Profile",
        required: false
      }
    ],
    incomingRequests: [
      {
        index: {
          type: Number,
          required: false
        },
        friendRequest: {
          type: Number,
          required: false
        },
        dmRequest: {
          type: Number,
          required: false
        },
        profileID: {
          type: mongoose.Schema.Types.ObjectId,
          required: false
        },
      },
    ],
    outgoingRequests: [
      {
        index: {
          type: Number,
          required: false
        },
        friendRequest: {
          type: Number,
          required: false
        },
        dmRequest: {
          type: Number,
          required: false
        },
        profileID: {
          type: mongoose.Schema.Types.ObjectId,
          required: false
        },
      },
    ],
    conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: false,
    }
  ],
}, {collection: "Profiles"});

module.exports = mongoose.model("Profile", profileSchema);
// Structure of Schema is further outlined in the Documentation