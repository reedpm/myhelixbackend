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
    const [postsLoaded, setPostsLoaded] = useState(false);

    // useEffect(()=>{}, []) -> will run whenever the component mounts
    useEffect(() => {
        const fetchFollowsData = async () => {
            console.log("currentProfileData is ", currentProfileData);
            try {
                const followsResponse = await fetch(dbURI +
                    `profile/getAllFollowing/${currentProfileID}`);

                if (!followsResponse.ok) {
                    console.error('Failed to fetch connections');
                }
                const followsData = await followsResponse.json();
                setFollows(followsData.data);
                console.log("follows response json is", followsData);
                console.log("follows is", follows);

                //  fetch posts for each user in follows
                const fetchPostsForFollows = async () => {
                    const promises = followsData.data.map(async (follower) => {
                        try {
                            const postsResponse = await fetch(dbURI + `posts/getPostsByProfileID/${follower._id}`);
                            console.log("postResponse is", postsResponse);
                            if (!postsResponse.ok) {
                                console.error('Failed to fetch posts for followers');
                                return [];
                            }

                            const postsData = await postsResponse.json();
                            return postsData.data.map(post => ({ ...post, createdByDisplayName: follower.displayName }));
                            // return postsData.data;
                        }
                        catch (error) {
                            console.error('Error fetching posts for followers: ', error);
                        }
                    });
                    console.log("promises is", promises);
                    //  wait for all promises to resolve and accumulate posts
                    const postsArray = await Promise.all(promises);

                    // Flatten the array of arrays into a single array of posts
                    const allPosts = postsArray.flat();
                    setPosts(allPosts);
                    setPostsLoaded(true);
                    console.log("Feed Screen posts is", posts);
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
            {postsLoaded && posts.length > 0 ? (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Post post={{ ...item, createdBy: item.createdByDisplayName }} />}
                />
            ) : (
                <Text>{postsLoaded ? 'Your feed is empty, try following someone to see what they are posting.' : 'Loading...'}</Text>
            )}
        </View>
    )
    // return (
    //     <View style={styles.container}>
    //         {posts.length > 0 ? (
    //             <FlatList
    //                 data={posts}
    //                 keyExtractor={(item) => item._id}
    //                 renderItem={({ item }) => <Post post={{ ...item, createdBy: currentProfileData.displayName }} />}
    //             />
    //         ) : (
    //                 <Text>Your feed is empty, try following someone to see what they are posting.</Text>
    //         )}
    //         {/* <FlatList
    //             data={posts}
    //             keyExtractor={(item) => item._id}
    //             renderItem={({ item }) => <Post post={{ ...item }} />}
    //         /> */}
    //     </View>
    // )
}

export default FeedScreen;
