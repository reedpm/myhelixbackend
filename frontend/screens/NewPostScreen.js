import React, { useState, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useGlobalContext } from "../GlobalContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fonts } from "../styles";
import { customFonts } from "../CustomFonts";
import DraggableFlatList from "react-native-draggable-flatlist"; // install this package


const NewPostScreen = () => {
  customFonts();
  const [text, setText] = useState("");

  // function to clear the text box (TextInput)
  const clearTextInput = () => {
    setText("");
  };

  // hook to clear TextInput when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      clearTextInput();
    }, [])
  );

  const { currentProfileData, UIColor } = useGlobalContext();
  const navigation = useNavigation();

  /// block-based code ////
  const blockTypes = {
    TEXT: "text",
    PHOTO_VIDEO: "photo/video",
    AUDIO: "audio",
  };

  // State to handle multiple blocks
  const [blocks, setBlocks] = useState([
    { id: "text1", type: "text", content: "", fixed: true }, // Default text block that cannot be removed
  ]);

  // Function to handle adding new blocks
  const addBlock = (type) => {
    const newBlock = {
      id: `${type}${Date.now()}`,
      type,
      content: "",
      fixed: false,
    };
    setBlocks((currentBlocks) => [...currentBlocks, newBlock]);
  };

  const removeBlock = useCallback(
    (id) => {
      if (blocks.length > 1) {
        setBlocks((currentBlocks) =>
          currentBlocks.filter((block) => block.id !== id)
        );
      } else {
        Alert.alert(
          "Action not allowed",
          "You cannot remove the default text block."
        );
      }
    },
    [blocks]
  );

  const reorderBlocks = useCallback(({ data }) => {
    setBlocks(data);
  }, []);

  const previewPost = async () => {
    if (text == "") {
      alert(
        "The post cannot be empty.",
        "Please write something in the text box before posting."
      );
    } else {
      navigation.navigate("PostPreview", {
        text: text,
      });
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: "photo",
      quality: 1,
      title: "Select profile picture",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      noData: true, // Exclude Base64 data
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        console.error("Image picker error:", response.error);
      } else {
        if (response.assets) {
          console.log(response);
          setNewImage(response.assets[0].uri);
          console.log(response.assets[0].uri);
          console.log(response.assets[0].uri.split(";base64,")[0]);
        }
      }
    });
  };
  const renderItem = ({ item, getIndex, drag, isActive }) => {
    // You should render the content based on the item type
    let content = <View />;
    console.log(item);
    console.log(getIndex);
    console.log(drag);
    console.log(isActive);
    switch (item.type) {
      case blockTypes.TEXT:
        content = (
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              const newBlocks = [...blocks];
              newBlocks[getIndex].content = text;
              setBlocks(newBlocks);
            }}
            value={item.content}
          />
        );
        break;
    }
    return (
      <View
        style={{
          ...styles.blockContainer,
          backgroundColor: isActive ? "#e0e0e0" : "#fff",
        }}
      >
        {content}
        {!item.fixed && (
          <Button title="Remove" onPress={() => removeBlock(item.id)} />
        )}
        <Button title="Reorder" onLongPress={drag} />
      </View>
    );
  };

  const handleCancel = () => {
    // Simple cancel functionality could just reset the blocks state to initial
    setBlocks([
      { id: "text1", type: blockTypes.TEXT, content: "", fixed: true },
    ]);
    // navigate back to the previous screen
    navigation.goBack();
  };

  const handlePostNow = () => {
    // In the future: Need to add API call to actually post
    // For now, we'll just log the blocks and clear them as if the post was successful
    console.log(blocks);
    setBlocks([
      { id: "text1", type: blockTypes.TEXT, content: "", fixed: true },
    ]);
    // Navigate to a 'Post Success' which can be the home page where the post has posted and show some feedback to the user
    Alert.alert("Post Successful", "Your post has been published!");
  };

  const styles = StyleSheet.create({
    blockContainer: {
      // Add styles for your block container
      padding: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      marginVertical: 5,
    },
    previewButtonContainer: {
      // Define your preview buttons styles here
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      paddingHorizontal: 16,
      paddingVertical: 16,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      justifyContent: "space-between",
    },
    textInput: {
      //   borderWidth: 1,
      flex: 1,
      borderColor: "#ccc",
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
      width: "100%",
      marginTop: 20,
      marginBottom: 15,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    photoButtonContainer: {
      backgroundColor: "grey",
      marginTop: 10,
      borderRadius: 50, // Use half of the width/height to make it circular
      width: 50, // Adjust the width as needed
      height: 50, // Adjust the height as needed
      alignItems: "center",
      justifyContent: "center",
    },
    submitButton: {
      backgroundColor: UIColor,
      marginTop: 10,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontFamily: fonts.regular,
      margin: 10,
    },
    icon: {
      width: 20,
      height: 20,
      resizeMode: "contain",
    },
    column: {
      flexDirection: "column",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      margin: 10,
    },
    title: {
      fontFamily: fonts.bold,
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  // Now using DraggableFlatList for reordering
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{
            uri:
              currentProfileData?.profileImage ??
              "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <Text style={styles.title}>{currentProfileData?.displayName}</Text>
      </View>

      <DraggableFlatList
        data={blocks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={reorderBlocks}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Add Text Block"
          onPress={() => addBlock(blockTypes.TEXT)}
        />
        <Button
          title="Add Photo/Video Block"
          onPress={() => addBlock(blockTypes.PHOTO_VIDEO)}
        />
        <Button
          title="Add Audio Block"
          onPress={() => addBlock(blockTypes.AUDIO)}
        />
        {/* ... add other buttons as needed... */}
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.photoButtonContainer}
          onPress={handleImagePicker}
        >
          <Image
            style={styles.icon}
            source={require("../assets/photo-rectangle.png")}
          />
        </Pressable>
        <Pressable style={styles.submitButton} onPress={previewPost}>
          <Text style={styles.buttonText}>Preview</Text>
        </Pressable>
      </View>

      <View style={styles.previewButtonContainer}>
        <Button title="Preview Post" onPress={previewPost} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
        <Button title="Post Now" onPress={handlePostNow} color="green" />
      </View>
    </View>
  );
};

export default NewPostScreen;
