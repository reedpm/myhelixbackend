// UserItem.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Connection = ({user, onEmailPress, onFaceTimePress}) => {
  const imageSource = user.profileImage ? {uri: user.profileImage} : null;
  const backgroundColor = imageSource ? null : getRandomColor();
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={[styles.profilePic, {backgroundColor}]}>
          {imageSource &&
           <Image
             source={user.profileImage}
             style={styles.profilePic} />}
        </View>
        <Text style={styles.name}>{user.displayName}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onEmailPress}>
          <Icon name="envelope" size={24}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFaceTimePress}>
          <Icon name="video-camera" size={24}  />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginTop: 12,
    marginLeft: 10,
  },
  icons: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green', // Default color, will be overridden by image
  },
});

export default Connection;
