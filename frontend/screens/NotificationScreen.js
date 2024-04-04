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
        sections={[{data: notifications || []}]}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({item}) => <Notification notification={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    ) : (
      <Text>You have no notifications!</Text>
    )}
    </View>
  );
};


export default NotificationsScreen;
