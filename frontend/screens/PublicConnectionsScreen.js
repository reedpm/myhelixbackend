import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList, SafeAreaView, Item} from 'react-native';
import FollowerList from '../components/FollowerList';
import FollowingList from '../components/FollowingList';
import SearchUserList from '../components/SearchUserList';
import {useGlobalContext, dbURI, UI_COLOR} from '../GlobalContext';

const PublicConnectionsScreen = () => {
  const [activeTab, setActiveTab] = useState('neither');
  const [query, setQuery] = useState('');
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();
  const [publicUsers, setPublicUsers] = useState();
  const [filteredFollowing, setFilteredFollowing] = useState(following);
  const [filteredFollowers, setFilteredFollowers] = useState(followers);
  const [filteredPublicUsers, setFilteredPublicUsers] = useState(publicUsers);



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
    const fetchAllPublicUsers = async() => {
        try {
            const response  = await fetch(dbURI + `profile/getAllPublicProfiles`);

            if (!response.ok) {
                console.error('Failed to fetch conenction requests');
            }
            console.log("SUCCESS??");
            const allPublicUser = await response.json();
            setPublicUsers(allPublicUser.data);
            setFilteredPublicUsers(allPublicUser.data);
        } catch (error) {
            console.log('error message for all user: ', error);
        }
    };
    fetchAllPublicUsers();
  }, []);


  useEffect(() => {
    console.log('HERE1??');
    const fetchFollowersData = async () => {
      try {
        const response = await fetch(dbURI +
          `profile/getAllFollowers/${currentProfileID}`);

        if (!response.ok) {
          console.error('Failed to fetch followers');
        }
        const followersData = await response.json();
        setFollowers(followersData.data);
        setFilteredFollowers(followersData.data);
      } catch (error) {
        console.log('error message for request: ', error);
      }
    };
    fetchFollowersData();
  }, []);

  useEffect(() => {
    console.log('HERE2??');
    const fetchFollowingData = async () => {
      try {
        const response = await fetch(dbURI +
          `profile/getAllFollowing/${currentProfileID}`);

        if (!response.ok) {
          console.error('Failed to fetch following');
        }
        const followingData = await response.json();
        console.log("### following data?? " + followingData);
        setFollowing(followingData.data);
        setFilteredFollowing(followingData.data);
      } catch (error) {
        console.log('error message: ', error);
      }
    };
    fetchFollowingData();
  }, []);

  const renderContent = () => {
    if (activeTab === 'tab1') {
      return (
      <View>
        <Text style={styles.tabTitle}>Following</Text>
        <FollowingList users={filteredFollowing}/>
      </View>
      );
    } else if (activeTab === 'tab2') {
      return <View><Text style={styles.tabTitle}>Followers</Text><FollowerList users={filteredFollowers}/></View>;
    } else {
        // show all tabs 
        console.log("NEITHER TAB??");
        return <View><SearchUserList users={filteredPublicUsers} /></View>
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    const formattedQuery = text.toLowerCase();
    if (activeTab == 'tab1') {
      const filteredData = following.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      setFilteredFollowing(filteredData);
    } else if (activeTab == 'tab2') {
      const filteredData = followers.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      setFilteredFollowers(filteredData);
    } else {
      const filteredData = publicUsers.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      setFilteredPublicUsers(filteredData);
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
            onPress={() => {setActiveTab('tab1')}}
          >
            <Text>following</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tab2' && styles.activeTab]}
            onPress={() => setActiveTab('tab2')}
          >
            <Text>followers</Text>
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

export default PublicConnectionsScreen;
