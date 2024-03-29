// Post.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { customFonts } from '../CustomFonts';
import { fonts } from '../styles';

const Post = ({post}) => {
  customFonts();
  return (
    <View style={styles.container}>
      <Text style={styles.body}>{post.postBody}</Text>
      <Text style={styles.createdBy}>Created by: {post.createdBy}</Text>
      <Text style={styles.date}>Created on: {post.createDate}</Text>
      <Text style={styles.createdBy}>Category: {post.category}</Text>
      {/* Add more components to display other post information as needed */}
    </View>
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
