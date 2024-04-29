import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import FollowerList from '../components/FollowerList';
import FollowingList from '../components/FollowingList';
import SearchUserList from '../components/SearchUserList';
import {useGlobalContext, dbURI} from '../GlobalContext';

const PublicConnectionsScreen = () => {
  const [activeTab, setActiveTab] = useState('neither');
  const [query, setQuery] = useState('');
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();
  const [filteredFollowing, setFilteredFollowing] = useState(following);
  const [filteredFollowers, setFilteredFollowers] = useState(followers);
  const [followingPublicUsers, setFollowingPublicUsers] = useState('');
  const [
    filteredFollowingPublicUsers,
    setFilteredFollowingPublicUsers,
  ] = useState('');
  const [
    notFollowingPublicUsers,
    setNotFollowingPublicUsers,
  ] = useState('');
  const [
    filteredNotFollowingPublicUsers,
    setFilteredNotFollowingPublicUsers,
  ] = useState('');


  const {
    currentProfileID,
  } = useGlobalContext();

  // get all public users, and save into two separate categories: following, not following
  useEffect(() => {
    const fetchAllPublicUsers = async () => {
      try {
        const response = await fetch(
            dbURI + `profile/getAllPublicProfiles/${currentProfileID}`,
        );

        if (!response.ok) {
          console.error('Failed to fetch conenction requests');
        }
        const allPublicUser = await response.json();
        setFollowingPublicUsers(allPublicUser.data1);
        setFilteredFollowingPublicUsers(allPublicUser.data1);

        setNotFollowingPublicUsers(allPublicUser.data2);
        setFilteredNotFollowingPublicUsers(allPublicUser.data2);
      } catch (error) {
        console.log('error message for all user: ', error);
      }
    };
    fetchAllPublicUsers();
  }, []);

  // fetch all user's followers
  useEffect(() => {
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

  // fethc all user's followings
  useEffect(() => {
    const fetchFollowingData = async () => {
      try {
        const response = await fetch(dbURI +
          `profile/getAllFollowing/${currentProfileID}`);

        if (!response.ok) {
          console.error('Failed to fetch following');
        }
        const followingData = await response.json();
        setFollowing(followingData.data);
        setFilteredFollowing(followingData.data);
      } catch (error) {
        console.log('error message: ', error);
      }
    };
    fetchFollowingData();
  }, []);

  const renderContent = () => {
    // render user's following
    if (activeTab === 'tab1') {
      return (
        <View>
          <Text style={styles.tabTitle}>Following</Text>
          <FollowingList users={filteredFollowing}/>
        </View>
      );
    } else if (activeTab === 'tab2') { // render user's followers
      return (
        <View>
          <Text style={styles.tabTitle}>Followers </Text>
          <FollowerList users={filteredFollowers}/>
        </View>
      );
    } else {
      // render all public profiles
      return (
        <View>
          <SearchUserList
            users={filteredFollowingPublicUsers}
            isConnection={true} isPrivate={false} isRequest={false}
          />
          <SearchUserList
            users={filteredNotFollowingPublicUsers}
            isConnection={false} isPrivate={false} isRequest={false}
          />
        </View>
      );
    }
  };
  
  // filter users based on search
  const handleSearch = (text) => {
    setActiveTab('neither');
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
      const filteredDataF = followingPublicUsers.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      const filteredDataNF = notFollowingPublicUsers.filter((user) => {
        return user.displayName.toLowerCase().includes(formattedQuery);
      });
      setFilteredFollowingPublicUsers(filteredDataF);
      setFilteredNotFollowingPublicUsers(filteredDataNF);
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
              onPress={() => {
                setActiveTab('tab1');
              }}
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
