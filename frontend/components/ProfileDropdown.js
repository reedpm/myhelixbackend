import React, { useRef, useState, useEffect } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
  Pressable,
  ScrollView
} from "react-native"
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, UI_COLOR, dbURI} from '../GlobalContext';
import {fonts} from '../styles';

const ProfileDropdown = ({data}) => {
    const {currentProfileData, userData, setUserData, setUIColor, setCurrentProfileID} = useGlobalContext();
    const DropdownButton = useRef()
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(undefined)
    const [profiles, setProfiles] = useState(undefined)
    const [dropdownTop, setDropdownTop] = useState(0)
    const [buttonLeft, setButtonLeft] = useState(0)

    const navigation = useNavigation();
    const buttonWidth = 160;

    useEffect(() => {
        const fetchCurrProfiles = async () => {
          try {

            const response = await fetch(
                dbURI + `profile/getCurrentProfiles/${userData.email}`,
            );
    
            if (!response.ok) {
              console.error('Failed to fetch current profiles');
            }
            const profiles = await response.json();
            setProfiles(profiles.data);
    
          } catch (error) {
            console.log('error message for all user: ', error);
          }
        };
        fetchCurrProfiles();
      });

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown()
    }

    const setInitialName = () => {
        if(userData) {
          return "Public Profile #" + (userData.publicProfiles.length + 1);
        }
        else{
          return "Public Profile #1";
        }
    }

    const handleProfileClick = () => {
        navigation.navigate('AppTabs', {
          screen: 'ConnectionsStack', params: {
            screen: 'Profile', params: {
                editing: false,
            }
          }
        });
    }

    const createNewProfile = async () => {
        const response = await fetch(dbURI + `user/addPublicProfile/${userData.email}`, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            displayName: setInitialName(),
            profileImage: null,
            bio: null,
          }),
        });
    
        if (!response.ok) {
          // Handle unsuccessful signup
          Alert.alert(
              'Create new profile failed',
          );
          return;
        }
        console.log('new profile success');
    
        const data = await response.json();
    
        console.log('got data');
        setUserData({...data});
        console.log('set data');
    
        setCurrentProfileID(data.publicProfiles[data.publicProfiles.length - 1]);
        setUIColor(UI_COLOR['PUBLIC']);
        // Navigate to the Profile screen upon successful signup
        navigation.navigate('AppTabs', {
            screen: 'ConnectionsStack', params: {
              screen: 'Profile', params: {
                editing: true,
              }
            }
          });
          console.log('navigated');
    }

    const handleNewProfileClick = () => {
        setVisible(false);
        createNewProfile();
    }

    const handleProfileSelect = item => {
        setCurrentProfileID(item._id);
        handleProfileClick();
        setUIColor(UI_COLOR[currentProfileData.type]);
    }

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py)
            setButtonLeft(_px - buttonWidth/2);
        })
        setVisible(true)
    }

    const onItemPress = item => {
        setSelected(item);
        // onSelect(item)
        setVisible(false);
        handleProfileSelect(item);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <View style={item.type == "PERSONAL" ? styles.privateBorder : styles.publicBorder}>
                {/* <View style={styles.padding}> */}
                    <Image
                        style= {styles.image}
                        source={{
                            uri: !item.profileImage ? 'https://reactnative.dev/img/tiny_logo.png' : item.profileImage,
                        }}
                    />
                {/* </View> */}
            </View> 

            <Text style={styles.buttonText}>{item.displayName}</Text>
            </TouchableOpacity>
    )

    const renderDropdown = () => {
        return (
        <Modal visible={visible} transparent animationType="none">
            <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}
            >
                <ScrollView style={[styles.dropdown, { top: dropdownTop }]}>
                    <Text style={styles.title}>your pages</Text>
                    <FlatList
                        // ListHeaderComponent={<View><Text style={styles.title}>your pages</Text></View>}
                        nestedScrollEnabled={true}
                        data={profiles}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id.toString()}
                    />
                    <TouchableOpacity
                        style={[styles.newPage, { left: buttonLeft, width: buttonWidth }]}
                        onPress={handleNewProfileClick}
                        >
                            <Text style={styles.newPageText}>+ new page</Text>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableOpacity>
        </Modal>
        )
    }

    return (
        <Pressable
        ref={DropdownButton}
        onPress={handleProfileClick}
        onLongPress={toggleDropdown}
        >
            {renderDropdown()}
            <Image
                style={styles.picture}
                source={{
                    uri: currentProfileData?.profileImage || 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />

        </Pressable>
    )
}

const styles = StyleSheet.create({
    newPage: {
        backgroundColor:UI_COLOR.PUBLIC, 
        padding: 0,
        margin: 20, 
        borderRadius: 10, 
        justifyContent: "center", 
        alignItems: "center", 
    },
    title: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        fontSize: 20,
        fontFamily: fonts.bold,
    },
    newPageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 20,
        fontFamily: fonts.regular,
        color: "white",
    },
    buttonText: {
        fontSize: 16,
        fontFamily: fonts.regular,
        paddingHorizontal: 20,
        paddingVertical: 20,
        textAlign: "center"
    },
    icon: {
        marginRight: 10
    },
    dropdown: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "100%",
        shadowColor: "#000000",
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        minHeight: "0%",
        maxHeight: "93%",
    },
    overlay: {
        width: "100%",
        height: "100%"
    },
    item: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        display: 'flex',
        flex: 1,
        flexDirection: "row",
        // justifyContent: "center",
    },
    picture: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    privateBorder:{
        borderRadius: "50%",
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: UI_COLOR.PERSONAL,
    },
    publicBorder:{
        borderRadius: "50%",
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: UI_COLOR.PUBLIC,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: "50%",
        borderWidth: 2,
        borderColor: 'transparent',
    },
})

export default ProfileDropdown
