import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Badge, ListItem} from '@rneui/themed';
import {customFonts} from '../CustomFonts';
import PropTypes from 'prop-types';

const Notification = ({notification}) => {
  customFonts();
  console.log(notification);
  console.log(notification.sender);
  const notificationMessages = {
    'COMMENT': 'commented on your post.',
    'LIKE': 'liked your post.',
    'FOLLOW': 'followed you.',
    'MESSAGE': 'messaged you.',
  };
  const styles = StyleSheet.create({
    notification: {
      fontWeight: 'bold',
    },
  });

  return (
    <ListItem bottomDivider>
      <Avatar rounded source={{uri: notification.sender.profileImage ?? 'https://reactnative.dev/img/tiny_logo.png'}} />
      <ListItem.Content>
        <ListItem.Title style={styles.notification}>
          {
            notification.sender.displayName + ' ' +
                notificationMessages[notification.type]
          }
        </ListItem.Title>
      </ListItem.Content>
      {!notification.read && <Badge status="error" />}
    </ListItem>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['COMMENT', 'LIKE', 'FOLLOW', 'MESSAGE']).isRequired,
    sender: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      followers: PropTypes.array.isRequired,
      following: PropTypes.array.isRequired,
      conversations: PropTypes.array.isRequired,
      posts: PropTypes.array.isRequired,
      pages: PropTypes.array.isRequired,
      incomingRequests: PropTypes.array.isRequired,
      outgoingRequests: PropTypes.array.isRequired,
      __v: PropTypes.number.isRequired,
    }),
    recipient: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
};

export default Notification;
