import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {Divider} from '@rneui/themed';

const NotificationItem = ({notification}) => {
  // Add more styling and functionality here as needed
  return (
    <View style={styles.notificationItem}>
      <Text>{notification.text}</Text>
    </View>
  );
};

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    // Using a static array for now
    setNotifications([
      {id: '1', text: 'john doe and 4 others liked your post'},
      // ... other notifications
    ]);
    // Effect only runs once on component mount - empty array
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    notificationItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd', // Use a light grey to separate items
    },
    // Add other styles here as needed
  });

  return (
    <View style={styles.container}>
      {/* Add a header or a segmented control here */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <NotificationItem notification={item} />}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

export default NotificationsScreen;
