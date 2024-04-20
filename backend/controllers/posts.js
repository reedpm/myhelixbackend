// Controller responsible for creating posts or getting posts
const mongoose = require("mongoose");
const Post = require("../models/posts.js");
const Profile = require("../models/profile.js");
const Notification = require("../controllers/notifications.js");
const Comment = require("../models/comments.js");

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
    console.log(req.params.currentid);
    try{
        // Find the post given the passed post ID
        const post = await Post.findById(req.params.postid);
        // make notification for the liking of this post
        // TODO: debug notification
        // req.body.senderProfileID = req.params.currentid; 
        // req.body.recipientProfileID = post.createdBy; 
        // req.body.type = 'POST'; 
        // await Notification.addNotification(req, res, next);
        // Check to make sure that we have not previously liked the post in the first place
        if(post && post.likes && !post.likes.includes(req.params.currentid)){
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
        const post = await Post.findById(req.params.postid);

        // Check to make sure we have liked the post in the first place
        if (post && post.likes && post.likes.includes(req.params.currentid)){
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

/**
 * Given: Profile ID
 * Returns: All posts that created by user with given profile ID 
 */
exports.getPostsByCreatedBy = async (req, res, next) => {
    try{
        Post.find({ createdBy: req.params.profileID }).exec()
        .then(data => {
            // If data is found, send it back
            res.status(200).send({ data: data });
        })
        .catch(err => {
            // If an error occurs, send an error response
            res.status(403).send({ data: err.message });
        });
    }
    catch(err){
        console.log("error");
        next(err);
    }
};

/*
TODO: make a function/route for making comments and make sure to 
create a notification in this function using the addNotification from the Notification controller
you can see the likePost function to see how this is done.
 * Given: JSON body
*/
exports.createComment = async (req, res, next) => {
    try {
        // Create a new post
        // (We understand that there should be a size limit to the contents of the post itself
        // however, it is most likely the better solution to check that on the frontend before
        // posting)
        const newComment = new Comment(
            {
                _id: new mongoose.Types.ObjectId(),
                commenter: req.body.commenterID,
                commentBody: req.body.content,
                commentDate: new Date(),
            }
        );

        // Save the new DB object into the collection
        await newComment.save();

        // get the post that the comment was made for
        const post = Post.findById(req.body.postID);

        // Update the post's comment list
        await post.updateOne({
            $push: { posts: newComment._id }
        });

        // Send the new post back to the user
        res.status(200).json(newComment);
    }
    catch (err) {
        next(err);
    }
};