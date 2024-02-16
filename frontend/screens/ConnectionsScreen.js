import React, {useState} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import ConnectionsRequestList from '../components/ConnectionsRequestList';
import ConnectionsList from '../components/ConnectionsList';

const ConnectionsScreen = () => {
  const users = [
    {id: 1, name: 'John Doe', profilePic: null},
    {id: 2, name: 'Jane Smith', profilePic: null},
    // ... more users
  ];

  const [activeTab, setActiveTab] = useState('tab1');
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);


  const renderContent = () => {
    if (activeTab === 'tab1') {
      return <View>
        <Text style={styles.tabTitle}>Connection Requests</Text>
        <ConnectionsRequestList users={filteredUsers} />
      </View>;
    } else if (activeTab === 'tab2') {
      return <View>
        <Text style={styles.tabTitle}>Your Connections</Text>
        <ConnectionsList users={filteredUsers} />
      </View>;
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const formattedQuery = text.toLowerCase();
    const filteredData = users.filter((user) => {
      return user.name.toLowerCase().includes(formattedQuery);
    });
    setFilteredUsers(filteredData);
  };

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Connections"
        value={query}
        onChangeText={handleSearch}
      />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tab1' && styles.activeTab]}
            onPress={() => setActiveTab('tab1')}
          >
            <Text>requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tab2' && styles.activeTab]}
            onPress={() => setActiveTab('tab2')}
          >
            <Text>connections</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {renderContent()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginRight: 15,
  },
  activeTab: {
    backgroundColor: 'lightblue',
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  searchBar: {
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#e8e8e8',
  },
});

export default ConnectionsScreen;
