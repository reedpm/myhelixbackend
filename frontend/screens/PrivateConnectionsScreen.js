import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import ConnectionsRequestList from '../components/ConnectionsRequestList';
import ConnectionsList from '../components/ConnectionsList';
import SearchUserList from '../components/SearchUserList';
import {useGlobalContext, dbURI} from '../GlobalContext';

const PrivateConnectionsScreen = () => {
  const [activeTab, setActiveTab] = useState('neither');
  const [query, setQuery] = useState('');
  const [connections, setConnections] = useState();
  const [requests, setRequests] = useState();
  const [
    filteredConnectionUsers,
    setFilteredConnectionUsers,
  ] = useState(connections);
  const [
    filteredRequestUsers,
    setFilteredRequestUsers,
  ] = useState(requests);
  const [
    followingPrivateUsers,
    setFollowingPrivateUsers,
  ] = useState('');
  const [
    filteredFollowingPrivateUsers,
    setFilteredFollowingPrivateUsers,
  ] = useState('');
  const [
    notFollowingPrivateUsers,
    setNotFollowingPrivateUsers,
  ] = useState('');
  const [
    filteredNotFollowingPrivateUsers,
    setFilteredNotFollowingPrivateUsers,
  ] = useState('');

  const [outgoingRequests, setOutgoingRequests] = useState('');
  const [filteredOutgoingRequests, setFilteredOutgoingRequests] = useState(outgoingRequests);


  const {
    currentProfileID,

  } = useGlobalContext();

  useEffect(() => {
    const fetchAllPrivateUsers = async () => {
      try {
        const response = await fetch(
            dbURI + `profile/getAllPrivateProfiles/${currentProfileID}`,
        );

        if (!response.ok) {
          console.error('Failed to fetch conenction requests');
        }
        console.log('SUCCESS??');
        const allPrivateUser = await response.json();
        setFollowingPrivateUsers(allPrivateUser.data1);
        setFilteredFollowingPrivateUsers(allPrivateUser.data1);

        setNotFollowingPrivateUsers(allPrivateUser.data2);
        setFilteredNotFollowingPrivateUsers(allPrivateUser.data2);

        setOutgoingRequests(allPrivateUser.data3);
        setFilteredOutgoingRequests(allPrivateUser.data3);
      } catch (error) {
        console.log('error message for all user: ', error);
      }
    };
    fetchAllPrivateUsers();
  }, []);

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
        setFilteredRequestUsers(requestData.data);
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
        setFilteredConnectionUsers(connectionData.data);
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
          <ConnectionsRequestList users={filteredRequestUsers}/>
        </View>
      );
    } else if (activeTab === 'tab2') {
      return (
        <View>
          <Text style={styles.tabTitle}>Your Connections</Text>
          <ConnectionsList users={filteredConnectionUsers}/>
        </View>
      );
    } else {
      // show all tabs
      return (
        <View>
          <SearchUserList
            users={filteredFollowingPrivateUsers}
            isConnection={true}
            isPrivate={true}
            isRequest={false}
          />
          <SearchUserList
            users={filteredOutgoingRequests}
            isConnection={false}
            isPrivate={true}
            isRequest={true}
          />
          <SearchUserList
            users={filteredNotFollowingPrivateUsers}
            isConnection={false}
            isPrivate={true}
            isRequest={false}
          />
        </View>
      );
    }
  };

  const handleSearch = (text) => {
    setActiveTab('neither');
    setQuery(text);
    const formattedQuery = text.toLowerCase();
    if (activeTab == 'tab1') {
      const filteredData = requests.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      setFilteredRequestUsers(filteredData);
    } else if (activeTab == 'tab2') {
      const filteredData = connections.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      setFilteredConnectionUsers(filteredData);
    } else {
      const filteredDataF = followingPrivateUsers.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      const filteredDataNF = notFollowingPrivateUsers.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });

      const filteredOutgoingRequest = outgoingRequests.filter((user) => {
        return user.recipients.displayName.toLowerCase().includes(formattedQuery);
      });
      console.log("### HERE: " + filteredOutgoingRequest);
      setFilteredFollowingPrivateUsers(filteredDataF);
      setFilteredNotFollowingPrivateUsers(filteredDataNF);
      setFilteredOutgoingRequests(filteredOutgoingRequest);
    }
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
            onPress={() => {
              setActiveTab('tab1');
            }}
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
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.content}>
            {renderContent()}
          </View>
        </ScrollView>
      </View>
    </View>
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

export default PrivateConnectionsScreen;
