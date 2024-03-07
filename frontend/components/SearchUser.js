import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';


const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// private: isConnection (follow & follower = true)
// public: isConnection (is a follower )
const SearchUser = ({user, onFollow, isConnection, isPrivate}) => {
  console.log('### user profile: ' + user.profileImage);
  const imageSource = user.profileImage ? {uri: user.profileImage} : null;
  const backgroundColor = imageSource ? null : getRandomColor();
  let buttonColor;
  if (isPrivate) {
    buttonColor = '#949AC3';
  } else {
    buttonColor = '#E9C2C2';
  }
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
      <View style={styles.buttonContainer}>
        { isConnection ?
            (
                <TouchableOpacity
                  style={[styles.button, styles.followButton]}
                  onPress={onFollow}
                >
                  <Text>unfollow</Text>
                </TouchableOpacity>
            ) :
            (
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: buttonColor}]}
                  onPress={onFollow}
                >
                  <Text>follow</Text>
                </TouchableOpacity>
            )
        }
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
  followButton: {
    backgroundColor: '#d3d3d3',
  },
  unfollowButton: {
    backgroundColor: '#949AC3',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green', // Default color, will be overridden by image
  },
});

SearchUser.propTypes = {
  user: PropTypes.shape({
    profileImage: PropTypes.string,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  onFollow: PropTypes.func.isRequired,
  isConnection: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default SearchUser;
