// Post.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';
import { customFonts } from '../CustomFonts';
import { fonts } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext, dbURI, UI_COLOR } from '../GlobalContext';
import { Button } from '@rneui/base';

const outlineRedHeart = require('../assets/red_heart_outline.png');
const filledRedHeart = require('../assets/red_heart_filled.png');
const commentOutline = require('../assets/chat.png');

const Post = ({ post }) => {
  const {
    currentProfileID,
    setCurrentProfileID,
    currentProfileData,
    setCurrentProfileData,
  } = useGlobalContext();

  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [liked, setLiked] = useState(false);

  customFonts();
  const navigation = useNavigation();
  const handlePostPress = () => {
    navigation.push('PostDetails', { post });
  };

  const handleLikePress = async () => {
    // increase like count 
    try {
      // console.log("after try");
      setLiked(!liked);
      console.log(liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      console.log(likeCount);
      console.log(currentProfileID);
      if (!liked) {
        const response = await fetch(dbURI + `posts/like/${post._id}/${currentProfileID}`, {
          method: 'POST',
        });
        // console.log("after fetching data");
      } else {
        const response = await fetch(dbURI + `posts/unlike/${post._id}/${currentProfileID}`, {
          method: 'POST',
        });
        // console.log("after fetching data");
      }

      if (!response.ok) {
        console.error('Failed to like/unlike post');
        return;
      }
      // console.log("no error");

    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentPress = async () => {
    // TODO: when press, will bring to a new page to write comment. Also include a submit button to add comment to database under profile of commenter
    navigation.navigate('NewComment');
  };

  return (
    <Pressable onPress={handlePostPress}>
      <View style={styles.container}>
        <Text style={styles.body}>{post.postBody}</Text>
        <Text style={styles.createdBy}>Created by: {post.createdBy}</Text>
        <Text style={styles.date}>Created on: {post.createDate}</Text>
        <Text style={styles.createdBy}>Category: {post.category}</Text>
        <div style={styles.likeCommentContainer}>
          <Pressable onPress={handleLikePress}>
            <Image style={styles.likeCommentIcons} source={!liked ? outlineRedHeart : filledRedHeart} alt='heart icon' />
          </Pressable>
          <Pressable onPress={handleCommentPress}>
            <Image style={styles.likeCommentIcons} source={commentOutline} alt='comment icon' />
          </Pressable>
        </div>
        {/* <Text style={styles.likes}>{likeCount}</Text> */}
        {/* Add more components to display other post information as needed */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: fonts.regular,
  },
  createdBy: {
    fontSize: 14,
    color: 'gray',
    fontFamily: fonts.regular,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    fontFamily: fonts.regular,
  },
  likeCommentContainer: {
    display: 'flex',
  },
  likesCount: {
    fontSize: 8,
    color: 'gray',
    fontFamily: fonts.regular,
  },
  likeCommentIcons: {
    width: 25,
    height: 25,
    gap: 0,
    opacity: 1,
  }

});

Post.propTypes = {
  post: PropTypes.shape({
    postBody: PropTypes.string,
    createdBy: PropTypes.string,
    createDate: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default Post;

