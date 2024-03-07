// UserItem.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {customFonts} from '../CustomFonts';
import {fonts} from '../styles';
import PropTypes from 'prop-types';


const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Connection = ({user, onEmailPress}) => {
  console.log('### user profile: ' + user.profileImage);
  customFonts();
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
          <Icon name="envelope" size={24} />
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
    fontFamily: fonts.regular,
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

Connection.propTypes = {
  user: PropTypes.shape({
    profileImage: PropTypes.string,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  onEmailPress: PropTypes.func.isRequired,
};

export default Connection;
