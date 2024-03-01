import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {useGlobalContext} from '../GlobalContext';
import PropTypes from 'prop-types';
import { customFonts } from '../CustomFonts';
import { fonts } from '../styles';

const PostPreviewScreen = (props) => {
  customFonts();
  const {
    UIColor,
  } = useGlobalContext();

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
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      fontFamily: fonts.regular,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 20,
    },
    submitButton: {
      backgroundColor: UIColor,
      alignSelf: 'flex-start',
      marginTop: 10,
      borderRadius: 15,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      margin: 10,
      fontFamily: fonts.regular,
    },
    icon: {
      width: 25,
      height: 25,
    },
  });

  return (
    <View style={styles.container}>
      <Text>{props.route.params.text}</Text>
      <Pressable style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>

    </View>
  );
};

PostPreviewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default PostPreviewScreen;
