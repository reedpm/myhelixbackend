import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList, SafeAreaView, Item} from 'react-native';
import ConnectionsRequestList from '../components/ConnectionsRequestList';
import Connection from '../components/Connection';
import ConnectionsList from '../components/ConnectionsList';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';

const ConnectionsScreen = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [query, setQuery] = useState('');
  const [connections, setConnections] = useState();
  const [requests, setRequests] = useState();
  const [filteredConnectionUsers, setFilteredConnectionUsers] = useState(connections);
  const [filteredRequestUsers, setFilteredRequestUsers] = useState(requests);


  const {
    currentProfileID,
    setCurrentProfileID,
    currentProfileData,
    setCurrentProfileData,
    userData,
    UIColor,
    setUIColor,
  } = useGlobalContext();

  useEffect(() => {
    console.log('HERE1??');
    const fetchIncomingRequestData = async () => {
      try {
        const response = await fetch(dbURI +
          `profile/getIncomingRequests/${currentProfileID}`);

        if (!response.ok) {
          console.error('Failed to fetch connection requests');
        }
        const requestData = await response.json();
        setRequests(requestData.data);
        console.log('request data', requestData.data);
      } catch (error) {
        console.log('error message for request: ', error);
      }
    };
    fetchIncomingRequestData();
  }, []);

  useEffect(() => {
    console.log('HERE2??');
    const fetchConnectionsData = async () => {
      try {
        const connectionsResponse = await fetch(dbURI +
          `profile/getAllFollowing/${currentProfileID}`);

        if (!connectionsResponse.ok) {
          console.error('Failed to fetch connections');
        }
        console.log(connectionsResponse.status);
        const connectionData = await connectionsResponse.json();
        setConnections(connectionData.data);
        console.log('connections data ' + connectionData.data);
      } catch (error) {
        console.log('error message: ', error);
      }
    };
    fetchConnectionsData();
  }, []);

  const renderContent = () => {
    if (activeTab === 'tab1') {
      return (
      <View>
        <Text style={styles.tabTitle}>Connection Requests</Text>
        <ConnectionsRequestList users={requests}/>
      </View>
      );
    } else if (activeTab === 'tab2') {
      return <View><Text style={styles.tabTitle}>Your Connections</Text><ConnectionsList users={connections}/></View>;
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const formattedQuery = text.toLowerCase();
    if (activeTab == 'tab1') {
      const filteredData = requests.filter((user) => {
        return user.name.toLowerCase().includes(formattedQuery);
      });
      setFilteredRequestUsers(filteredData);
    } else {
      const filteredData = connections.filter((user) => {
        return user.name.toLowerCase().includes(formattedQuery);
      });
      setFilteredConnectionUsers(filteredData);
    }
  };

  return (
    <ScrollView scrollEnabled={true}>
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
            onPress={() => {setActiveTab('tab1'); updateButtonColor()}}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrowth: 1,
  },
  container: {
    flexGrowth: 1,
    padding: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    marginRight: 15,
    width: 120, // Width of the button
    height: 29, // Height of the button
    backgroundColor: 'lightgray', // Background color of the button
    justifyContent: 'center', // Centers the text inside the button
    alignItems: 'center', // Aligns text to the center horizontally
    borderRadius: 15, // Rounded edges
  },
  activeTab: {
    backgroundColor: 'gray',
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
