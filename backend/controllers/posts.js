// Controller responsible for creating posts or getting posts
const mongoose = require("mongoose");
const Post = require("../models/posts.js");
const Profile = require("../models/profile.js");
const Comment = require("../models/comments.js");
const addNotification = require('./notifications').addNotification;


/**
 * Given: JSON body
 * Please read the documentation, the documentation
 * will provide information on what to provide in the JSON package
 */
exports.createPost = async (req, res, next) => {
    try {
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
            $push: { posts: newPost._id }
        });

        // Send the new post back to the user
        res.status(200).json(newPost);
    }
    catch (err) {
        next(err);
    }
}

/**
 * @param postid: the Post ID 
 * @function delete Deletes the post associated with the post ID
 */
exports.deletePost = async (req, res, next) => {
    try {
        // Find the post by ID and delete it from the database
        Post.findByIdAndDelete(req.params.postid);
    }
    catch (err) {
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
    try {
        // Find the post given the passed post ID
        const post = await Post.findById(req.params.postid);
        // Check to make sure that we have not previously liked the post in the first place
        if (post && post.likes && !post.likes.includes(req.params.currentid)) {
            await post.updateOne({
                $push: { likes: req.params.currentid }
            });

            // make notification for the liking of this post
            req.body.senderProfileID = req.params.currentid;
            req.body.recipientProfileID = post.createdBy;
            req.body.type = 'LIKE';
            await addNotification(req, res, next);

            // We also need to update the like count
            let like_count = post.likeCount;
            like_count = like_count + 1;
            await post.updateOne({ likeCount: like_count });
        }
    }
    catch (err) {
        next(err);
    }
}

/**
 * @param postid: the Post ID 
 * @param currentid : the ID of the current profile
 * @function Unlike unlikes the post with the current user
 */
exports.unlikePost = async (req, res, next) => {
    try {
        // Find the post given the passed post ID
        const post = await Post.findById(req.params.postid);

        // Check to make sure we have liked the post in the first place
        if (post && post.likes && post.likes.includes(req.params.currentid)) {
            await post.updateOne({
                $pull: { likes: req.params.currentid }
            });

            // We also need to update the like count
            let like_count = post.likeCount;
            like_count = like_count - 1;
            await post.updateOne({ likeCount: like_count });
        }
    }
    catch (err) {
        next(err);
    }
}

/**
 * Given: Profile ID
 * Returns: All posts that created by user with given profile ID 
 */
exports.getPostsByCreatedBy = async (req, res, next) => {
    try {
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
    catch (err) {
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
                // postID: req.body.postID,
                commenter: req.body.commenterID,
                commentBody: req.body.content,
                commentDate: new Date(),
            }
        );

        const commenterID = req.body.commenterID;

        // Save the new DB object into the collection
        await newComment.save();

        // get the post that the comment was made for
        console.log("Post id is", req.body.postID);
        const post = await Post.findById(req.body.postID);
        console.log("Post createdby 175 post.js controller is ", post.createdBy);

        if (!post) {
            console.log("line 178 post not found");
            return res.status(404).json({ message: "Post not found" });
        }

        // Update the post's comment list
        console.log(newComment._id);
        await post.updateOne({
            $push: { comments: newComment._id },
        });

        console.log("Post createdBy is", post.createdBy);

        // send notification for comment 
        req.body.senderProfileID = commenterID;
        req.body.recipientProfileID = post.createdBy;
        req.body.type = 'COMMENT';
        await addNotification(req, res, next);

        // Send the new post back to the user
        await res.status(200).json(newComment);
    }
    catch (err) {
        next(err);
    }
};

/**
 * Given: Post ID
 * Returns: All comments associated with given post ID
 */
exports.getCommentsByPostID = async (req, res, next) => {
    // console.log("line1 196");
    try {
        // Find the post given the passed post ID
        console.log("line 192");
        const post = await Post.findById(req.params.postid);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // retrieve all comments for the post
        console.log("line 199");
        // const comments = await Comment.find({ _id: { $in: post.comments } });
        // console.log(comments);
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(comments);

        Comment.find({ _id: { $in: post.comments } }).exec()
            .then(data => {
                // console.log("posts controller data is", data);
                res.status(200).send({ data: data });
            })
            .catch(err => {
                res.status(403).send({ data: err.message });
            });
    }
    catch (err) {
        next(err);
    }
};