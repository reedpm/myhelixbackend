import React, { useRef, useState } from "react"
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
import {useGlobalContext} from '../GlobalContext';

const ProfileDropdown = ({ data, onSelect }) => {
    const {currentProfileData} = useGlobalContext();
    const DropdownButton = useRef()
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(undefined)
    const [dropdownTop, setDropdownTop] = useState(0)

    const navigation = useNavigation();

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown()
    }

    const handleProfileClick = () => {
        navigation.navigate('AppTabs', {
          screen: 'Connections', params: {
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
        setSelected(item)
        onSelect(item)
        setVisible(false)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            {/* <View> */}
                <Image
                    style={styles.picture}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <Text style={styles.buttonText}>{item.label}</Text>
            {/* </View>        */}
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
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
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
})

export default ProfileDropdown
