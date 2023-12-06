// Controller responsible for creating posts or getting posts
const mongoose = require("mongoose");
const Post = require("../models/posts.js");
const Profile = require("../models/profile.js");

/**
 * Given: JSON body
 * Please read the documentation, the documentation
 * will provide information on what to provide in the JSON package
 */
exports.createPost = async (req, res, next) => {
    try{
        // Create a new post
        // (We understand that there should be a size limit to the contents of the post itself
        // however, it is most likely the better solution to check that on the frontend before
        // posting)
        const newPost = new Post(
            {
                _id: new mongoose.Types.ObjectId(),
                createdBy: req.body.profileID,
                postBody: req.body.content,
                createDate: new Date(),
                category: req.body.category,
                likeCount: 0
            }
        );
        
        // Save the new DB object into the collection
        await newPost.save();

        // Get the profile that just created the post
        const profile = Profile.findById(req.body.profileID);

        // Update the profile's post list
        await profile.updateOne({
            $push: {posts: newPost._id}
        });
        
        // Send the new post back to the user
        res.status(200).json(newPost);
    }
    catch(err){
        next(err);
    }
}

/**
 * @param postid: the Post ID 
 * @function delete Deletes the post associated with the post ID
 */
exports.deletePost = async (req, res, next) => {
    try{
        // Find the post by ID and delete it from the database
        Post.findByIdAndDelete(req.params.postid);
    }
    catch(err){
        next(err);
    }
}

/**
 * @param postid: the Post ID 
 * @param currentid : the ID of the current profile
 * @function Like Likes the post with the current user
 */
exports.likePost = async (req, res, next) => {
    try{
        // Find the post given the passed post ID
        const post = Post.findById(req.params.postid);

        // Check to make sure that we have not previously liked the post in the first place
        if(!post.likes.includes(req.params.currentid)){
            await post.updateOne({
                $push: {likes: req.params.currentid}
            });

            // We also need to update the like count
            let like_count = post.likeCount;
            like_count = like_count + 1;
            await post.updateOne({likeCount: like_count});
        }
    }
    catch(err){
        next(err);
    }
}

/**
 * @param postid: the Post ID 
 * @param currentid : the ID of the current profile
 * @function Unlike unlikes the post with the current user
 */
exports.unlikePost = async (req, res, next) => {
    try{
        // Find the post given the passed post ID
        const post = Post.findById(req.params.postid);

        // Check to make sure we have liked the post in the first place
        if(post.likes.includes(req.params.currentid)){
            await post.updateOne({
                $pull: {likes: req.params.currentid}
            });

            // We also need to update the like count
            let like_count = post.likeCount;
            like_count = like_count - 1;
            await post.updateOne({likeCount: like_count});
        }
    }
    catch(err){
        next(err);
    }
}