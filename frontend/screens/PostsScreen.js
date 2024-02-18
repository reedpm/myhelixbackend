import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Posts from '../components/Post';
import { useNavigation } from '@react-navigation/native';

const PostsScreen = () => {

    const post1 = {
        postBody: "This is the content of the post.",
        createdBy: "John Doe",
        createDate: "2024-02-17",
        category: "Technology",
    };

    const post2 = {
        postBody: "aldkaf;alskdjfaldflkasjfe;slkajdflaksejfas. asldkfjealksjdfaelskfjesflksdf. laksdjfleksajlfjasdfe.",
        createdBy: "Huong Nguyen",
        createdDate: "2024-02-18",
        category: "Random",
    }

    return (
        <View style={styles.container}>
            {/* Passing the post object as the post prop to the Post component */}
            <Posts post={post1} />
            <Posts post={post2} />
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