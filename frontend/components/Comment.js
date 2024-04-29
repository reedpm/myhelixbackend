// Post.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';
import { customFonts } from '../CustomFonts';
import { fonts } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext, dbURI, UI_COLOR } from '../GlobalContext';
import { Button } from '@rneui/base';


const Comment = ({ comment }) => {
    customFonts();

    return (
        <View style={styles.container}>
            <Text style={styles.commenter}>Created by: {comment.commenter}</Text>
            <Text style={styles.date}>Created on: {comment.commentDate}</Text>
            <Text style={styles.body}>{comment.commentBody}</Text>
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
    commenter: {
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

Comment.propTypes = {
    comment: PropTypes.shape({
        commenter: PropTypes.string,
        commentBody: PropTypes.string,
        commentDate: PropTypes.string,
    }).isRequired,
};

export default Comment;

