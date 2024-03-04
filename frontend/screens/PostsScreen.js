import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Posts from '../components/Post';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const PostsScreen = () => {
    // state to store fetched posts
    // all the posts will be stored in the "posts" array
    // setPost is function used to change up the state of the posts array
    const [posts, setPosts] = useState([]);
    const [currentProfileID, setCurrentProfileID] = useState(personalProfile);

    // useEffect(()=>{}, []) -> will run whenever the component mounts
    useEffect(() => {
        // fetch posts from backend
        const fetchPosts = async () => {
            try {
                // make GET request to fetch posts from backend 
                // TODO: have to get the post ID to pass into the URL
                const response = await axios.get('http://localhost:3000/api/getPostsByProfileID/:profileID');

                // set the fetched posts to state
                // TODO: fix since assumming response.data conatins posts data
                setPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        // call fetchPOsts when component mounts
        fetchPosts();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* map over the posts array and render a Posts component for each post */}
                {posts.map((post, index) => (
                    <Posts key={index} post={post} />
                ))}
            </ScrollView>
        </View>
    )

    // const post1 = {
    //     postBody: "This is the content of the post.",
    //     createdBy: "John Doe",
    //     createDate: "2024-02-17",
    //     category: "Technology",
    // };

    // const post2 = {
    //     postBody: "aldkaf;alskdjfaldflkasjfe;slkajdflaksejfas. asldkfjealksjdfaelskfjesflksdf. laksdjfleksajlfjasdfe.",
    //     createdBy: "Huong Nguyen",
    //     createdDate: "2024-02-18",
    //     category: "Random",
    // }

    // return (
    //     <View style={styles.container}>
    //         {/* Passing the post object as the post prop to the Post component */}
    //         <Posts post={post1} />
    //         <Posts post={post2} />
    //     </View>

    // );
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