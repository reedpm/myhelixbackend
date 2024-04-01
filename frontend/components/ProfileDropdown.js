import React, { useRef, useState, useEffect } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
  Pressable
} from "react-native"
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, UI_COLOR, dbURI} from '../GlobalContext';

const ProfileDropdown = () => {
    const {currentProfileData, userData, setCurrentProfileID} = useGlobalContext();
    const DropdownButton = useRef()
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(undefined)
    const [profiles, setProfiles] = useState(undefined)
    const [dropdownTop, setDropdownTop] = useState(0)

    const navigation = useNavigation();

    useEffect(() => {
        const fetchCurrProfiles = async () => {
          try {
            console.log('trying');

            const response = await fetch(
                dbURI + `profile/getCurrentProfiles/${userData.email}`,
            );
    
            if (!response.ok) {
              console.error('Failed to fetch current profiles');
            }
            console.log('curr profile success');
            const profiles = await response.json();
            setProfiles(profiles.data);
    
          } catch (error) {
            console.log('error message for all user: ', error);
          }
        };
        fetchCurrProfiles();
      }, []);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown()
    }

    const handleProfileClick = () => {
        navigation.navigate('AppTabs', {
          screen: 'ConnectionsStack', params: {
            screen: 'Profile'
          }
        });
    }

    const handleProfileSelect = item => {
        if(item.type == "PERSONAL")
            setCurrentProfileID(userData.personalProfile);
        else {
            setCurrentProfileID(item._id);
        }
        setUIColor(UI_COLOR[currentProfileData.type]);
        navigation.navigate('AppTabs', {
          screen: 'ConnectionsStack', params: {
            screen: 'Profile'
          }
        });
    }

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownTop(py + h)
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
                <View style={[styles.dropdown, { top: dropdownTop }]}>
                    <FlatList
                    data={profiles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id.toString()}
                    />
                </View>
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
    buttonText: {
        // flex: 1,
        paddingHorizontal: 30,
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
    },
    overlay: {
        width: "100%",
        height: "100%"
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        display: 'flex',
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
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
