import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native';
import Post from '../components/Post';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext, dbURI, UI_COLOR } from '../GlobalContext';
import { Button } from '@rneui/base';

const PostDetailsScreen = ({ route }) => {
    // get the post data passed from the FeedScreen thru navigation 
    const { post } = route.params;
    const navigation = useNavigation();

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
            <Button title="Back" onPress={() => navigation.navigate('AppTabs', { screen: 'Feed', })} />
        </View>
    )
}

export default PostDetailsScreen;