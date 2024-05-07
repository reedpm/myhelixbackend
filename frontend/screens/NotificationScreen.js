import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
} from 'react-native';
import {Divider} from '@rneui/themed';
import {fonts} from '../styles';
import {useGlobalContext, dbURI} from '../GlobalContext';
import Notification from '../components/Notification';


const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationSections, setNotificationSections] = useState([]);
  const {currentProfileID} = useGlobalContext();

  const groupNotificationsByDate = (notifications) => {
    const groupedNotifications = {
      'Today': [],
      'Last Week': [],
      'Older': [],
    };

    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    notifications.forEach((notification) => {
      const createDate = new Date(notification.createDate);

      if (createDate.toDateString() === today.toDateString()) {
        groupedNotifications['Today'].push(notification);
      } else if (createDate > lastWeek) {
        groupedNotifications['Last Week'].push(notification);
      } else {
        groupedNotifications['Older'].push(notification);
      }
    });

    // Convert grouped notifications into sections
    const sections = Object.keys(groupedNotifications).map((category) => ({
      title: category,
      data: groupedNotifications[category],
    }));

    return sections;
  };

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
      const sections = groupNotificationsByDate(notificationsData.data);
      setNotificationSections(sections);
      console.log(notificationsData);
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
    title: {
      fontFamily: fonts.bold,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
      <SectionList
        sections={
          notificationSections.filter((section) => section.data.length > 0)
        }
        keyExtractor={(item, index) => item._id + index}
        renderItem={({item}) => <Notification notification={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    ) : (
      <Text style={styles.title}>You have no notifications!</Text>
    )}
    </View>
  );
};


export default NotificationsScreen;
