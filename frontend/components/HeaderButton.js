import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { EllipseProfile, HeaderLeftBlue, HeaderRightRed } from '../icons/index';
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, UI_COLOR} from '../GlobalContext';
import leftHeader from "../assets/navbar/headerLeftBlue.svg";
import { ImageBackground } from 'react-native-web';

const HeaderButton = ( props ) => {
  const [newImage, setNewImage] = useState(null);

  const {
    setCurrentProfileID,
    currentProfileData,
    userData,
    setUIColor,
  } = useGlobalContext();

  const navigation = useNavigation();
  
  const handlePublicClick = () => {
    setCurrentProfileID(userData.publicProfiles[0]);
    setUIColor(UI_COLOR[currentProfileData.type]);
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  }

  const handlePrivateClick = () => {
    setCurrentProfileID(userData.personalProfile);
    setUIColor(UI_COLOR[currentProfileData.type]);
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  }

  const handleProfileClick = () => {
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  }

  // const leftBar = require("../assets/left_toggle.png");
  // const rightBar = require("../assets/right_toggle.png");

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'rgba(0,0,0,1)'
      }}>
      <TouchableOpacity
        onPress={handlePrivateClick}
        style= {{
          width: '50%',
          resizeMode:"contain",
          // height: 20,
        }}
        >
        {/* <HeaderLeftBlue/> */}
        {/* <img src="../assets/navbar/stretchedHeaderLeftBlue.svg" width="100%" resizeMode="contain" maxHeight="60"/> */}
        <img src="../assets/leftToggleSmallest.png" resizeMode="contain"  height="60"/>
        {/* <Image source={leftBar} styles={styles.toggle}/> */}
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={handleProfileClick}
        style= {{
          resizeMode:"stretch"
        }}
        >
        <Image
          style={styles.picture}
          source={{
            uri: newImage || 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePublicClick}
        style= {{
          width: '50%',
          resizeMode:"contain"
        }}
        >
        {/* <HeaderRightRed/> */}
        <img src="../assets/rightToggleSmallest.png" resizeMode="contain"  height="60"/>
        {/* <Image source={rightBar} width="100%" styles={styles.toggle}/> */}

      </TouchableOpacity>
        

      {/* <EllipseProfile/> */}
    </View>
  )
};

const styles = StyleSheet.create({
  picture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  toggle: {
    flex: 1,
    width: 400,
    maxHeight: 60,
    resizeMode: 'stretch',
  }
});

export default HeaderButton;