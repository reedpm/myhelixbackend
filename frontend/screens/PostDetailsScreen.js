import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native';
import Post from '../components/Post';
import Comment from '../components/Comment';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext, dbURI, UI_COLOR } from '../GlobalContext';
import { Button } from '@rneui/base';

const PostDetailsScreen = ({ route }) => {
    // get the post data passed from the FeedScreen thru navigation 
    const { post } = route.params;
    const navigation = useNavigation();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(dbURI + `posts/getCommentsByPostID/${post._id}`);

                if (!response.ok) {
                    console.error('Failed to fetch comments for post');
                }

                const responseData = await response.json();
                setComments(responseData.data);
            } catch (error) {
                console.log('Error fetching comments: ', error);
            }
        };

        // fetch comments when component mounts
        fetchComments();
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 16,
            paddingVertical: 16,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
        },
    });

    return (
        <View style={styles.container}>
            <Post post={post} />
            <FlatList
                data={comments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Comment comment={{ ...item }} />}
            />
            <Button title="Back" onPress={() => navigation.navigate('AppTabs', { screen: 'Feed', })} />
        </View>
    )
}

export default PostDetailsScreen;