import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Posts from '../components/Post';
import { useNavigation } from '@react-navigation/native';

const PostsScreen = () => {

    const post = {
        postBody: "This is the content of the post.",
        createdBy: "John Doe",
        createDate: "2024-02-17",
        category: "Technology",
    };

    return (
        <View style={styles.container}>
            {/* Passing the post object as the post prop to the Post component */}
            <Posts post={post} />
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PostsScreen;