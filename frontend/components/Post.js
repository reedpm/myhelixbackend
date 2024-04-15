// Post.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';
import { customFonts } from '../CustomFonts';
import { fonts } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext, dbURI, UI_COLOR } from '../GlobalContext';
import { Button } from '@rneui/base';

const likeIconImg = require('../assets/leftToggle.png');

const Post = ({ post }) => {
  const {
    currentProfileID,
    setCurrentProfileID,
    currentProfileData,
    setCurrentProfileData,
  } = useGlobalContext();

  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [liked, setLiked] = useState(false);

  // TODO: fix this so rerender page after hitting like count
  // useEffect(() => {
  //   handleLikePress();
  // }, [likeCount]);

  customFonts();
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.push('PostDetails', { post });
  };

  const handleLikePress = async () => {
    // toggle between red and blank when clicked vs unlicked
    // if (!liked) {
    //   setColor('#ff0000');
    // }

    // increase like count 
    try {
      // DEBUG: get stuck in fetching data
      // console.log("after try");
      setLiked(!liked);
      console.log(liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      console.log(likeCount);
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

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.body}>{post.postBody}</Text>
        <Text style={styles.createdBy}>Created by: {post.createdBy}</Text>
        <Text style={styles.date}>Created on: {post.createDate}</Text>
        <Text style={styles.createdBy}>Category: {post.category}</Text>
        {/* <Image style={styles.likeIcon} src={likeIconImg} /> */}
        <Button onPress={handleLikePress}>{liked ? 'Unlike' : 'Like'}</Button>
        <Text style={styles.likes}>{likeCount}</Text>
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
  likesCount: {
    fontSize: 8,
    color: 'gray',
    fontFamily: fonts.regular,
  },
  likeIcon: {
    width: 25,
    height: 25,
    top: 538,
    left: 297,
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
