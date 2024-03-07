import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';


const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};
const Following = ({user}) => {
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
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, acceptButtonStyle]}
          onPress={onAccept}
        >
          <Text style={acceptTextStyle}>accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text>delete</Text>
        </TouchableOpacity>
      </View> */}
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
  acceptButtonPrivate: {
    backgroundColor: '#344497',
  },
  acceptButtonPublic: {
    backgroundColor: '#9D7F95',
  },
  privateButtonText: {
    color: 'white',
  },
  publicButtonText: {
    color: 'black',
  },
  deleteButton: {
    backgroundColor: '#d3d3d3',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
  },
});

Following.propTypes = {
  user: PropTypes.shape({
    profileImage: PropTypes.string,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Following;
