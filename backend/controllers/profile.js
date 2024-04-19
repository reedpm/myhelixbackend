const mongoose = require("mongoose");
const Profile = require("../models/profile");
const User = require("../models/user.js");


// const Tag_notification = require("../models/tag_notification");
// 
// const Request = require("../models/request");
// const Conversation = require("../models/conversations");


/**
 * Given: Profile ID
 * Returns: Profile object if it exists
 */
exports.getProfile = async (req, res, next) => {
    try{
        // old deprecated code 
        // Retrieve the profile with the passed in profile ID
        // await Profile.findById(req.params.profileID, (err, data) => {
        //     // If we receive an error, send back an error message
        //     if(err){
        //         res.status(403).send({data: err});
        //     }
        //     // Else send back the data retreived
        //     else{
        //         res.status(200).send({data: data});
        //     }
        // });
        Profile.findById(req.params.profileID).exec()
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

/**
 * Given: profile's information
 * Returns: Updated profile information
 */
exports.update = async (req, res, next) => {
    // We ensure that the email passed in the path matches the email passed by the verification token
    console.log(req.params);
    console.log(req.body);
    // if(req.params.email === req.profile.email){
      try{
        // Here we are finding user by email, and updating its contents with the provided body from the request
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.profileID, 
          {
            $set: req.body,
          },
          {
            new: true, // This simply states that we return the user contents after the update has been completed
          }
        );
  
        res.status(200).json(updatedProfile);
      }
      catch(err){
        next(err);
      }
    // }
    // else{
    //   return next(handleError(403, "Invalid Profile update request"));
    // }
  }
// 

/**
 * Given: profile's information
 * Returns: Updated user information (profile list excludes deleted public profile)
 */
exports.deletePublicProfile = async (req, res, next) => {
  // We ensure that the email passed in the path matches the email passed by the verification token
  console.log(req.params);
  console.log(req.body);
  try{
    // Find user in DB by email and delete
    await Profile.findOneAndDelete({_id: req.params.profileID});
    //delete profile from publicProfiles list within User
    const user = await User.findOneAndUpdate(
      {email: req.params.email},
      { $pull: {publicProfiles: req.params.profileID}},
      {new: true},
    );
    // return updated user with one less public profile
    res.status(200).json(user);
  }
  catch(err){
    next(err);
  }
}

/**
 * Given: Profile ID
 * Returns: List of all Personal profiles
 */
exports.getAllPrivateProfiles = async (req, res, next) => {
  try{
    const personalProfiles = await Profile.find({ type: 'PERSONAL' });

    const profile = await Profile.findById(req.params.profileID);
    if (!profile) {
      return res.status(409).send('Profile not found');
    } else {
      console.log("### profile following " + profile.following);
    }


    var notFollowingArr = [];
    var followingArr = [];

    for (var i = 0; i < personalProfiles.length; i++) {
      if (!(profile.following).includes(personalProfiles[i]._id)) {
        notFollowingArr.push(personalProfiles[i]);
      } else {
        followingArr.push(personalProfiles[i]);
      }
    }

    res.status(200).send({ data1: followingArr, data2: notFollowingArr});

  }
  catch(err){
      console.log("error");
      next(err);
  }
};

/**
 * Given: Profile ID
 * Returns: Profile object if it exists
 */
exports.getAllPublicProfiles = async (req, res, next) => {
  try{
    const publicProfiles = await Profile.find({ type: 'PUBLIC' });
    // differentiate between already follower and stranger
    const profile = await Profile.findById(req.params.profileID);
    if (!profile) {
      return res.status(409).send('Profile not found');
    } 
    console.log("### this is profile " + profile);

    var notFollowingArr = [];
    var followingArr = [];
    console.log("### this is public following: " + profile.following);
    for (var i = 0; i < publicProfiles.length; i++) {
      if (!(profile.following).includes(publicProfiles[i]._id)) {
        notFollowingArr.push(publicProfiles[i]);
      } else {
        followingArr.push(publicProfiles[i]);
      }
    }
    console.log("### following arr " + followingArr);

    res.status(200).send({ data1: followingArr, data2: notFollowingArr});
  }
  catch(err){
      console.log("error");
      next(err);
  }
};

/**
 * Given: Profile email
 * Returns: Profile objects associated with that email
 */
exports.getCurrentProfiles = async (req, res, next) => {
  try{
    const profiles = await Profile.find({ user: req.params.profileEmail });

    if (!profiles) {
      return res.status(409).send('Profile not found');
    } 

    res.status(200).send({ data: profiles });
  }
  catch(err){
      console.log("error");
      next(err);
  }
};

// mongoose.Promise = Promise;

// // get all tagNotifications
// exports.getAllTagNotifications = async (req, res) => {
//   const tNotifications = await Tag_notification.find();
//   res.send(tNotifications);
// };

// /*
//  take displayedNameds array and return 
//  corresponding ProfileIDs array
//  */

//  exports.getProfileIDs = (req, res) => {
//   const array = req.query.array;
//   //console.log(array);
//   var inputDisplayedNames = JSON.parse(array).displayedNames;
//   //console.log(inputDisplayedNames);
  
//   //var inputDisplayedNames = ["Apu", "ParamV1", "ParamV2"];
//   //console.log(inputDisplayedNames);
//   var returnArray = [];

//   for (let i = 0; i < inputDisplayedNames.length; i++) {

//     let inputDisplayedName = inputDisplayedNames[i];
    
//     Profile.find({ displayedName: inputDisplayedName }, function (err, docs) {
//       if (err) {
//         res.status(404).send({ data: err });
//       } else {
//         if (docs.length > 0 && docs[0]._id !== undefined) {       
//           returnArray.push(docs[0]._id.toString());
//           //console.log(returnArray);
//           //console.log(i);
//           if(i==0){
//             //console.log("final");
//             //console.log(returnArray);
//             res.status(200).send({ data: returnArray });
//           }
//         } else {
//           returnArray.push("");
//         }
//       }
//     });    

//   }
  
// };

// /**
//  * Given: pid
//  * Returns: Number of followers
//  */
// exports.getNumFollowers = (req, res) => {
//   const proid = req.params["proid"];
//   Profile.findById(proid, "followers", function (err, docs) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       if (docs.followers !== undefined) {
//         const result = {
//           data: {
//             followers: docs.followers.length,
//           },
//         };
//         res.status(200).send(result);
//       } else {
//         res.status(404).send({ data: null });
//       }
//     }
//   });
// };

// /**
//  * Given: pid
//  * Returns: Number of following
//  */
// exports.getNumFollowing = (req, res) => {
//   const proid = req.params["proid"];
//   Profile.findById(proid, "following", function (err, docs) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       if (docs.following !== undefined) {
//         const result = {
//           data: {
//             following: docs.following.length,
//           },
//         };
//         res.status(200).send(result);
//       } else {
//         res.status(404).send({ data: null });
//       }
//     }
//   });
// };

// /**
//  * Given: pid
//  * Returns: Array of uids of followers
//  */
// exports.getAllFollowers = (req, res) => {
//   const proid = req.params["proid"];
//   Profile.findById(proid, "followers", function (err, data) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       res.status(200).send({ data: data });
//     }
//   });
// };


// /**
//  * Given: pid
//  * Returns: Array of uids of followees
//  */
exports.getAllFollowing = (req, res) => {
  try{
    // });
    Profile.findById(req.params.profileID).populate('following').exec()
    .then(data => {
        // If data is found, send it back
        // console.log(data);
        res.status(200).send({ data: data.following});
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

// /**
//  * Given: pid
//  * Returns: Array of uids of followees
//  */
exports.getAllFollowers = (req, res) => {
  try{
    // });
    Profile.findById(req.params.profileID).populate('followers').exec()
    .then(data => {
        // If data is found, send it back
        // console.log(data);
        res.status(200).send({ data: data.followers});
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

// exports.getConversations = (req, res) => {
//   const proid = req.params["proid"];
//   Profile.findById(proid, "conversations", function (err, data) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       res.status(200).send({ data: data });
//     }
//   });
// };

// /**
//  * Given: pid
//  * Returns: Array of uids of followers and followees
//  */
// exports.getFollowInfo = (req, res) => {
//   const proid = req.params["proid"];
//   Profile.findById(proid, "following followers", function (err, data) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       res.status(200).send({ data: data });
//     }
//   });
// };

// /**
//  * Given: pid
//  * Returns: User objects for all owners of that profile
//  */
// exports.getPageOwnerProfiles = (req, res) => {
//   const proid = req.params["proid"];

//   Profile.findById(proid, "owners")
//     .populate({ path: "owners", select: "" })
//     .exec(function (err, data) {
//       if (err) {
//         res.status(404).send({ data: err });
//       } else {
//         res.status(200).send({ data: data });
//       }
//     });
// };
// /**
//  * Given: pid of follower, pid of followee
//  * Returns: True if follower is a follower of followee, else False
//  */
// exports.isFollower = (req, res) => {
//   const { follower, followee } = req.params;
//   Profile.findById(followee, "followers", function (err, docs) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       res.status(200).send({ data: docs.followers.includes(follower) });
//     }
//   });
// };

// /**
//  * Given: pid
//  * Returns: Number of friends
//  */
// exports.getNumFriends = (req, res) => {
//   const proid = req.params["proid"];
//   Profile.findById(proid, "followers type", function (err, docs) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       if (docs.type !== "PERSONAL") {
//         res.status(200).send({ data: { friends: -1 } });
//       } else if (docs.followers !== undefined) {
//         const result = {
//           data: {
//             friends: docs.followers.length,
//           },
//         };
//         res.status(200).send(result);
//       } else {
//         res.status(404).send({ data: null });
//       }
//     }
//   });
// };

exports.getIncomingRequests = async (req, res) => {
  try{
    // });
    Profile.findById(req.params.profileID)
    .populate({
      path: 'incomingRequests',
      populate: {
          path: 'sender',
          model: 'Profiles'
      }
    })
    .exec()
    .then(data => {
      console.log("### " + data);
      // If data is found, send it back
      var requestProfiles = []
      for (let i = 0; i < data.incomingRequests.length; i++) {
        requestProfiles.push({sender: data.incomingRequests[i].sender, requestId: data.incomingRequests[i]._id});
        console.log("$$$" + requestProfiles[i]);
      }
      res.status(200).send({ data: requestProfiles});
      console.log("*** " + requestProfiles);
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

// exports.getIncomingRequests = async (req, res) => {
//   try{
//     const requestId = await Profile.findById(req.params.profileID).populate('incomingRequests').exec();
//     console.log("requestId", requestId);
//     Requests.findById(requestId).populate('sender').exec()
//     .then(data => {
//       // If data is found, send it back
//       console.log("what is this data? : " + data);
//       res.status(200).send({ data: data});
//     })
//     .catch(err => {
//         // If an error occurs, send an error response
//         res.status(403).send({ data: err.message });
//     });
// } catch(err){
//     console.log("error");
//     next(err);
//     res.status(403).send({ data: err.message });
// }
// };

// exports.getOutgoingRequests = (req, res) => {
//   const { proid } = req.params;
//   Profile.findById(proid, "outgoingRequests")
//     .populate({
//       path: "outgoingRequests",
//       select: "",
//       populate: { path: "requestee requester", select: "" },
//     })
//     .exec(function (err, docs) {
//       if (err) {
//         res.status(404).send({ data: err });
//       } else {
//         res.status(200).send({ data: docs });
//       }
//     });
// };

// /**
//  * Given: pid and information to update
//  * Updates: Profile
//  * Returns: Updated document if successful else error
//  */
// exports.setProfileInfo = (req, res) => {
//   const pid = req.body.pid;
//   delete req.body.pid;

//   Profile.findByIdAndUpdate(pid, req.body, function (err, docs) {
//     if (err) {
//       res.status(404).send({ data: err });
//     } else {
//       res.status(200).send({ data: docs });
//     }
//   });
// };

// /**
//  * Given: followee and follower
//  * Updates: Adds followee to follower's following array
//  *          and follower to followee's followers array
//  * Returns: Updated document if successful else error
//  */
// exports.followProfile = async (req, res) => {
//   const { followee, follower } = req.body;
//   const followeePromise = await Profile.findById(followee)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));
//   const followerPromise = await Profile.findById(follower)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));

//   Promise.all([followeePromise, followerPromise])
//     .then(async (profiles) => {
//       const followeeProfile = profiles[0];
//       const followerProfile = profiles[1];
      
//       if (followeeProfile.followers.indexOf(follower) === -1) {
//         followeeProfile.followers.push(follower);
//         await followeeProfile
//           .save()
//           .catch((err) => res.status(404).send({ data: err }));
//       }
//       if (followerProfile.following.indexOf(followee) === -1) {
//         followerProfile.following.push(followee);
//         await followerProfile
//           .save()
//           .catch((err) => res.status(404).send({ data: err }));
//       }

//       res.status(200).send({
//         data: { followee: followeeProfile, follower: followerProfile },
//       });
//     })
//     .catch((err) => {
//       res.status(404).send({ data: err });
//     });
// };

// exports.unfollowProfile = async (req, res) => {
//   const { followee, follower } = req.body;

//   const followeePromise = await Profile.findById(followee)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));
//   const followerPromise = await Profile.findById(follower)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));
//   Promise.all([followeePromise, followerPromise])
//     .then(async (profiles) => {
//       const followeeProfile = profiles[0];
//       const followerProfile = profiles[1];
  
//       const followeeRemovePromise = await followeeProfile
//         .updateOne({ $pull: { followers: followerProfile._id } })
//         .exec()
//         .catch((err) => res.status(404).send({ data: err }));
//       const followerRemovePromise = await followerProfile
//         .updateOne({ $pull: { following: followeeProfile._id } })
//         .exec()
//         .catch((err) => res.status(404).send({ data: err }));
//       Promise.all([followeeRemovePromise, followerRemovePromise]).then(
//         (results) => { 
//           res.status(200).send({ data: results })
//       }

//       );
//     })
//     .catch((err) => res.status(404).send({ data: err }));
// };

// exports.sendRequest = async (req, res) => {
//   console.log("sent")
//   const { followee, follower } = req.body;
//   const followeePromise = await Profile.findById(followee)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));
//   const followerPromise = await Profile.findById(follower)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));

//   Promise.all([followeePromise, followerPromise])
//     .then(async (profiles) => {
//       const followeeProfile = profiles[0];
//       const followerProfile = profiles[1];

//       const request = new Request({
//         requester: followerProfile._id,
//         requestee: followeeProfile._id,
//       });
//       request.save().then(async (requestRes) => {
//         followeeProfile.incomingRequests.push(requestRes._id);
//         followerProfile.outgoingRequests.push(requestRes._id);
//         const followeeSave = await followeeProfile
//           .save()
//           .catch((err) => res.status(404).send({ data: err }));
//         const followerSave = await followerProfile
//           .save()
//           .catch((err) => res.status(404).send({ data: err }));
//         Promise.all([followeeSave, followerSave])
//           .then(() => {
//             res.status(200).send({ data: request });
//           })
//           .catch((err) => res.status(404).send({ data: err }));
//       });
//     })
//     .catch((err) => {
//       res.status(404).send({ data: err });
//     });
// };

// exports.withdrawRequest = async (req, res) => {
//   const { followee, follower } = req.body;

//   Request.findOneAndDelete(
//     { requester: follower, requestee: followee },
//     async function (err, docs) {
//       if (err) {
//         res.status(404).send({ data: err });
//       } else {
//         const followeePromise = await Profile.findByIdAndUpdate(followee, {
//           $pull: { incomingRequests: docs._id },
//         })
//           .exec()
//           .catch((err) => res.status(404).send({ data: err }));
//         const followerPromise = await Profile.findByIdAndUpdate(follower, {
//           $pull: { outgoingRequests: docs._id },
//         })
//           .exec()
//           .catch((err) => res.status(404).send({ data: err }));
//         Promise.all([followeePromise, followerPromise])
//           .then((results) => {
//             console.log(results)
//             res.status(200).send({ data: results })
//           })
//           .catch((err) => res.status(404).send({ data: err }));
//       }
//     }
//   );
// };

// exports.unfriendProfile = async (req, res) => {
//   const { followee, follower } = req.body;

//   const followeePromise = await Profile.findById(followee)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));
//   const followerPromise = await Profile.findById(follower)
//     .exec()
//     .catch((err) => res.status(400).send({ data: err }));
//   Promise.all([followeePromise, followerPromise])
//     .then(async (profiles) => {
//       const followeeProfile = profiles[0];
//       const followerProfile = profiles[1];
      
//       const followeeRemovePromise = await followeeProfile
//         .updateOne({ $pull: { followers: followerProfile._id, following: followerProfile._id } })
//         .exec()
//         .catch((err) => res.status(404).send({ data: err }));
//       const followerRemovePromise = await followerProfile
//         .updateOne({ $pull: { followers: followeeProfile._id, following: followerProfile._id  } })
//         .exec()
//         .catch((err) => res.status(404).send({ data: err }));
//       Promise.all([followeeRemovePromise, followerRemovePromise]).then(
//         (results) => res.status(200).send({ data: results })
//       );
      
//     })
//     .catch((err) => res.status(404).send({ data: err }));
// };

// exports.acceptDenyRequest = async (req, res) => {
//   const { followee, follower, accept } = req.body;

//   Request.findOneAndDelete(
//     { requester: follower, requestee: followee },
//     async function (err, docs) {
//       if (err) {
//         res.status(404).send({ data: err });
//       } else {
//         let followeePromise = 0;
//         let followerPromise = 0;

//         if (accept) {
//           followeePromise = await Profile.findByIdAndUpdate(followee, {
//             $pull: { incomingRequests: docs._id },
//             $addToSet: { followers: docs.requester, following: docs.requester },
//           })
//             .exec()
//             .catch((err) => res.status(404).send({ data: err }));
//           followerPromise = await Profile.findByIdAndUpdate(follower, {
//             $pull: { outgoingRequests: docs._id },
//             $addToSet: { followers: docs.requestee, following: docs.requestee },
//           })
//             .exec()
//             .catch((err) => res.status(404).send({ data: err }));
//         } else {
//           followeePromise = await Profile.findByIdAndUpdate(followee, {
//             $pull: { incomingRequests: docs._id },
//           })
//             .exec()
//             .catch((err) => res.status(404).send({ data: err }));
//           followerPromise = await Profile.findByIdAndUpdate(follower, {
//             $pull: { outgoingRequests: docs._id },
//           })
//             .exec()
//             .catch((err) => res.status(404).send({ data: err }));
//         }

//         Promise.all([followeePromise, followerPromise])
//           .then((results) => res.status(200).send({ data: results }))
//           .catch((err) => res.status(404).send({ data: err }));
//       }
//     }
//   );
// };

// exports.createNewPage = (req, res) => {
//   const profile = new Profile(req.body);
//   const user = req.body.user;
//   profile.type = "PAGE";
//   profile.owners = [user];
//   profile
//     .save()
//     .then((page) => {
//       User.findByIdAndUpdate(user, { $push: { pages: page._id } })
//         .then((result) => {
//           res.status(200).send({ data: page });
//         })
//         .catch((err) => {
//           res.status(404).send({ data: err });
//         });
//     })
//     .catch((err) => {
//       res.status(404).send({ data: err });
//     });
// };

// exports.updateUnreadCount = async (req, res) => {

//     const pid = req.body.pid;
//     const newCount = req.body.newCount;
//     const cid = req.body.cid;

//     try{
//         const profile = await Profile.findById(pid);
//         profile.unreadCount = newCount;
//         const savedProfile = await profile.save();

//         const convo = await Conversation.findById(cid);
//         convo.unreadCount = 0;

//         await convo.save();

//         res.send(savedProfile);
//     } catch (err) {
//         res.status(404).send(err);
//     }
// }

// exports.getUnreadMessageCount = async (req, res) => {

//     const pid = req.params["proid"];

//     try{
//         const profile = await Profile.findById(pid);

//         const result = {
//             data: {
//               unreadCount: profile.unreadCount,
//             },
//           };
//           res.status(200).send(result);
//     } catch(err) {
//         res.status(404).send(err);
//     }
// }

// exports.getCategories = (req, res) => {
//   res.status(200).send({
//     data: [
//       {
//         title: "Food",
//         image: "https://reactnative.dev/img/tiny_logo.png",
//       },
//       {
//         title: "Music",
//         image: "https://reactnative.dev/img/tiny_logo.png",
//       },
//       {
//         title: "Health",
//         image: "https://reactnative.dev/img/tiny_logo.png",
//       },
//       {
//         title: "Art",
//         image: "https://reactnative.dev/img/tiny_logo.png",
//       },
//       {
//         title: "Travel",
//         image: "https://reactnative.dev/img/tiny_logo.png",
//       },
//       {
//         title: "Entertainment",
//         image: "https://reactnative.dev/img/tiny_logo.png",
//       },
//     ],
//   });
// }
