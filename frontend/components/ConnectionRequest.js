// UserItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};
const ConnectionsRequest = ({ user, onAccept, onDelete }) => {
  const imageSource = user.profilePic ? { uri: user.profilePic } : null;
  const backgroundColor = imageSource ? null : getRandomColor();

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={[styles.profilePic, { backgroundColor }]}>
          {imageSource && <Image source={user.profilePic} style={styles.profilePic} />}
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
          <Text>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text>Delete</Text>
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
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    marginLeft: 20,
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green', // Default color, will be overridden by image
  },
});

export default ConnectionsRequest;