import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useGlobalContext} from '../GlobalContext';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { fonts } from '../styles';
import {customFonts} from '../CustomFonts';


const NewPostScreen = () => {
  customFonts();
  const [text, setText] = useState('');

  // function to clear the text box (TextInput)
  const clearTextInput = () => {
    setText('');
  };

  // hook to clear TextInput when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      clearTextInput();
    }, [])
  );
  
  const {
    currentProfileData,
    UIColor,
  } = useGlobalContext();
  const navigation = useNavigation();


  const previewPost = async () => {
    if (text == '') {
      alert(
          'The post cannot be empty.',
          'Please write something in the text box before posting.',
      );
    } else {
      navigation.navigate(
          'PostPreview',
          {
            text: text,
          },
      );
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      title: 'Select profile picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true, // Exclude Base64 data
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        console.error('Image picker error:', response.error);
      } else {
        if (response.assets) {
          console.log(response);
          setNewImage(response.assets[0].uri);
          console.log(response.assets[0].uri);
          console.log(response.assets[0].uri.split(';base64,')[0]);
        }
      }
    });
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
      justifyContent: 'space-between',
    },
    textInput: {
    //   borderWidth: 1,
      flex: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      fontFamily: fonts.regular,
      marginVertical: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginRight: 20,
    },
    divider: {
      width: '100%',
      marginTop: 20,
      marginBottom: 15,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    photoButtonContainer: {
      backgroundColor: 'grey',
      marginTop: 10,
      borderRadius: 50, // Use half of the width/height to make it circular
      width: 50, // Adjust the width as needed
      height: 50, // Adjust the height as needed
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButton: {
      backgroundColor: UIColor,
      marginTop: 10,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: fonts.regular,
      margin: 10,
    },
    icon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'center',
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
      <TextInput
        style={styles.textInput}
        multiline={true}
        rows={10}
        placeholder="Type here..."
        onChangeText={(inputText) => setText(inputText)}
        value={text}
      />
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.photoButtonContainer}
          onPress={handleImagePicker}
        >
          <Image
            style={styles.icon}
            source={require('../assets/photo-rectangle.png')}
          />
        </Pressable>
        <Pressable style={styles.submitButton} onPress={previewPost}>
          <Text style={styles.buttonText}>Preview</Text>
        </Pressable>
      </View>

    </View>
  );
};


export default NewPostScreen;
