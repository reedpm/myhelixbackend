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

  // const leftBar = require("../assets/navbar/headerLeftBlue.svg");
  // const rightBar = require("../assets/navbar/headerRightRed.svg");
  // const backgroundHeader = require("../assets/navbar/rightAndLeftHeader.svg");
  // const barWidth = 300;

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
          // width: '100%',
          height: 20,
        }}
        >
        {/* <HeaderLeftBlue/> */}
        <img src="../assets/navbar/stretchedHeaderLeftBlue.svg" width="100%" resizeMode="contain" maxHeight="60"/>
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
          resizeMode:"stretch"
        }}
        >
        {/* <HeaderRightRed/> */}
        <img src="../assets/navbar/stretchedHeaderRightRed.svg" width="100%" resizeMode="contain" styles={styles.toggle}/>
        {/* <Image source={rightBar} styles={styles.toggle}/> */}

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
    width: '100%',
    maxHeight: 60,
  }
});

export default HeaderButton;