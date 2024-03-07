import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';


const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Follower = ({user}) => {
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

Follower.propTypes = {
  user: PropTypes.shape({
    profileImage: PropTypes.string,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Follower;
