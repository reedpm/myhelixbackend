import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, UI_COLOR} from '../GlobalContext';

const HeaderButton = () => {
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
  };

  const handlePrivateClick = () => {
    setCurrentProfileID(userData.personalProfile);
    setUIColor(UI_COLOR[currentProfileData.type]);
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  };

  const handleProfileClick = () => {
    navigation.navigate('AppTabs', {
      screen: 'Profile',
    });
  };

  const windowWidth = useWindowDimensions().width;

  const leftBarSmallest = require('../assets/leftToggleSmallest.png');
  const rightBarSmallest = require('../assets/rightToggleSmallest.png');
  const leftBarSmaller = require('../assets/leftToggleSmaller.png');
  const rightBarSmaller = require('../assets/rightToggleSmaller.png');
  const leftBar = (windowWidth > 1350) ?
  require('../assets/leftToggle.png') : (windowWidth < 730) ?
  leftBarSmallest: leftBarSmaller;
  const rightBar = (windowWidth > 1350) ?
  require('../assets/rightToggle.png') : (windowWidth < 730) ?
  rightBarSmallest: rightBarSmaller;


  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={handlePrivateClick}>
        <Image source= {leftBar} style={styles.toggleLeft}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProfileClick}>
        <Image
          style={styles.picture}
          source={{
            uri: currentProfileData?.profileImage || 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePublicClick}>
        <Image source={rightBar} style={styles.toggleRight}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  toggleLeft: {
    height: 60,
  },
  toggleRight: {
    height: 60,
  },
});

export default HeaderButton;
