/**
 * Comment is for swagger documentation / defining the Profile schema
 * 
 * @swagger 
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - _id
 *         - type
 *         - user
 *         - displayName
 *       properties:
 *         _id:
 *           type: object
 *           description: The MongoDB object ID for the profile
 *         type:
 *           type: string
 *           description: The type of profile it is. Can be either public or personal
 *         user:
 *           type: object
 *           description: The object ID of the user that was created at sign up
 *         displayName:
 *           type: string
 *           description: The display name of the profile
 *         profileImage:
 *           type: string
 *           description: URL to the profile image
 *         bio:
 *           type: string
 *           description: A character count limited bio for the Profile
 *         followers:
 *           type: array
 *           description: A list of followers to the Profile (this list may differ depending on a user's public or personal profiles)
 *         following:
 *           type: array
 *           description: A list of other profiles that a profile is following
 *         incomingRequests:
 *           type: array
 *           description: An array of requests being received (each element contains a request number and a profile ID)
 *         outgoingRequests:
 *           type: array
 *           description: An array of outgoing requests to other profiles (each element contains a request number and a profile ID)
 *         conversations:
 *           type: array
 *           description: An array of conversation ID's
 *         posts:
 *           type: array
 *           description: An array of posts ID's that the profile is responsible for creating
 *         pages:
 *           type: array 
 *           description: An array of page ID's that the profile is following/subscribed to
 */

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