// Post.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Post = ({ post }) => {
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
  },
  createdBy: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Post;
