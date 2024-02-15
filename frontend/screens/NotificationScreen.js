import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
} from 'react-native';
import { Divider, Avatar, Badge, ListItem } from '@rneui/themed';

const NotificationItem = ({ item }) => {
  return (
    <ListItem bottomDivider>
      <Avatar rounded source={{ uri: item.avatarUrl }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: 'bold' }}>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
      </ListItem.Content>
      {item.isNew && <Badge status="error" />}
    </ListItem>
  );
};

const NotificationsScreen = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend and group them
    // Using a static array for grouped notifications for now
    setSections([
      { title: 'Today', data: [{ id: '1', title: 'John Doe and 4 others', subtitle: 'liked your post', avatarUrl: 'avatar_url', isNew: true }] },
      { title: 'Last week', data: [{ id: '2', title: 'Jane Doe', subtitle: 'sent you a connection request', avatarUrl: 'avatar_url', isNew: false }] },
      // other grouped notifications
    ]);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    sectionHeader: {
      fontWeight: '800',
      fontSize: 16,
      color: '#000',
      marginTop: 20,
      marginBottom: 5,
      paddingHorizontal: 16,
    },
    // Add other styles here as needed
  });

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => <NotificationItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

export default NotificationsScreen; 