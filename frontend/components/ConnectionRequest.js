// UserItem.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';


const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};
const ConnectionsRequest = ({user, onAccept, onDelete}) => {
  console.log("This is user data: " + user);
  const imageSource = user.profileImage? {uri: user.profileImage} : null;
  const backgroundColor = imageSource ? null : getRandomColor();

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={[styles.profilePic, {backgroundColor}]}>
          {
            imageSource &&
          <Image source={user.profileImage} style={styles.profilePic} />
          }
        </View>
        <Text style={styles.name}>{user.displayName}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
          <Text>accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text>delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    // padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#cccccc',
  },
  name: {
    fontSize: 18,
    marginTop: 12,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    minHeight: 20,
    alignItems: 'center',
    marginLeft: 20,
  },
  acceptButton: {
    backgroundColor: '#9D7F95',
  },
  deleteButton: {
    backgroundColor: '#d3d3d3',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green', // Default color, will be overridden by image
  },
});

export default ConnectionsRequest;
