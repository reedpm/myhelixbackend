import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native';
import Post from '../components/Post';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext, dbURI, UI_COLOR } from '../GlobalContext';

const FeedScreen = () => {
    // state to store fetched posts
    // all the posts will be stored in the "posts" array
    // setPost is function used to change up the state of the posts array
    const {
        currentProfileID,
        setCurrentProfileID,
        currentProfileData,
        setCurrentProfileData,
    } = useGlobalContext();

    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState([]);

    // useEffect(()=>{}, []) -> will run whenever the component mounts
    useEffect(() => {
        const fetchFollowsData = async () => {
            try {
                const followsResponse = await fetch(dbURI +
                    `profile/getAllFollowing/${currentProfileID}`);

                if (!followsResponse.ok) {
                    console.error('Failed to fetch connections');
                }
                const followsData = await followsResponse.json();
                setFollows(followsData.data);

                //  fetch posts for each user in follows
                const fetchPostsForFollows = async () => {
                    const promises = followsData.data.map(async (follower) => {
                        try {
                            const postsResponse = await fetch(dbURI + `posts/getPostsByProfileID/${follower._id}`);

                            if (!postsResponse.ok) {
                                console.error('Faileed to fetch posts for followers');
                                return [];
                            }

                            const postsData = await postsResponse.json();
                            return postsData.data;
                        }
                        catch (error) {
                            console.error('Error fetching posts for followers: ', error);
                        }
                    });

                    //  wait for all promises to resolve and accumulate posts
                    const postsArray = await Promise.all(promises);

                    // Flatten the array of arrays into a single array of posts
                    const allPosts = postsArray.flat();
                    setPosts(allPosts);
                };

                fetchPostsForFollows();
            } catch (error) {
                console.log('Error fetching follows: ', error);
            }
        };

        // call fetchFollowsData() when component mounts
        fetchFollowsData();
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
            <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <Post post={{ ...item }} />}
            />
        </View>
    )
}

export default FeedScreen;