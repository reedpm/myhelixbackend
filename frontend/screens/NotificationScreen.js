import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
} from 'react-native';
import {Divider, Avatar, Badge, ListItem} from '@rneui/themed';
import {customFonts} from '../CustomFonts';
import {fonts} from '../styles';
import PropTypes from 'prop-types';
import {useGlobalContext, dbURI} from '../GlobalContext';


const NotificationItem = ({notification}) => {
  customFonts();
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

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const {currentProfileID} = useGlobalContext();


  const fetchNotifications = async () => {
    try {
    // Fetch user posts
      const notificationsResponse = await fetch(
          dbURI +
          `notifications/getNotificationsByProfileID/${currentProfileID}`);

      if (!notificationsResponse.ok) {
        console.error('Failed to fetch notifications');
        return;
      }

      const notificationsData = await notificationsResponse.json();

      setNotifications(notificationsData.data);
      console.log(notificationsData.data);
    } catch (error) {
      console.error('Error during notifications fetch:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    sectionHeader: {
      fontWeight: '800',
      fontSize: 16,
      fontFamily: fonts.regular,
      color: '#000',
      marginTop: 20,
      marginBottom: 5,
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      {notifications ? (
      <SectionList
        sections={[{title: 'Notifications', data: notifications || []}]}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({item}) => <NotificationItem notification={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    ) : (
      <Text>No notifications found</Text>
    )}
    </View>
  );
};

NotificationItem.propTypes = {
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
    }).isRequired,
    recipient: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
};

export default NotificationsScreen;
