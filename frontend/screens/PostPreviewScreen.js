import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {useGlobalContext, dbURI} from '../GlobalContext';
import PropTypes from 'prop-types';
import {customFonts} from '../CustomFonts';
import {fonts} from '../styles';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PostPreviewScreen = (props) => {
  customFonts();
  const {
    currentProfileData,
    UIColor,
  } = useGlobalContext();
  const navigation = useNavigation();

  const createPost = async () => {
    try {
      const response = await fetch(dbURI + 'posts/createPost/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileID: currentProfileData._id,
          content: props.route.params.text,
          category: proprs.route.params.category,
        }),
      });

      if (!response.ok) {
        // Handle unsuccessful post creation
        Alert.alert(
            'Post could not be made',
            'Please try again later.',
        );
        return;
      }
      navigation.navigate('AppTabs', {
        screen: 'Feed',
      });
    } catch (error) {
      console.error('Error during post creation:', error);
    }
  };

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
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 20,
    },
    submitButton: {
      backgroundColor: UIColor,
      alignSelf: 'flex-end',
      marginTop: 10,
      borderRadius: 15,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      margin: 10,
      fontFamily: fonts.regular,
    },
    scroll: {
      maxHeight: 750,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      fontSize: 16,
      fontFamily: fonts.regular,
      marginVertical: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 20,
      fontWeight: 'bold',
    },
    postText: {
      fontSize: 16,
      fontFamily: fonts.regular,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri: currentProfileData?.profileImage ?? 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <Text style={styles.title}>{currentProfileData?.displayName}</Text>
      </View>
      <Text style={styles.title}>{props.route.params.category}</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.postText}>{props.route.params.text}</Text>
      </ScrollView>
      <Pressable style={styles.submitButton} onPress={createPost}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

PostPreviewScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      text: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


export default PostPreviewScreen;
