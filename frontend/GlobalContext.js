import React, {createContext, useContext, useState, useEffect} from 'react';
import {colors} from './styles';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const dbURI = 'http://localhost:3000/api/';
export const UI_COLOR = {
  PERSONAL: '#344497',
  PUBLIC: colors.red, // 9D7F95
};

export const GlobalProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [currentProfileID, setCurrentProfileID] = useState(null);
  const [currentProfileData, setCurrentProfileData] = useState(null);
  const [UIColor, setUIColor] = useState(UI_COLOR.PERSONAL);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
            dbURI + `profile/getProfile/${currentProfileID}`,
        );
        if (!response.ok) {
          console.error('Failed to fetch profile data');
          return;
        }

        const data = await response.json();
        setCurrentProfileData({
          ...data.data,
          profileImage: 'https://reactnative.dev/img/tiny_logo.png',
        });
        setUIColor(UI_COLOR[data.data.type]);
      } catch (error) {
        console.error('Error during profile data fetch:', error);
      }
    };

    if (currentProfileID) {
      fetchProfileData();
    }
  }, [currentProfileID, setCurrentProfileID,
    setUserData, setCurrentProfileData, setUIColor]);

  return (
    <GlobalContext.Provider value={
      {
        userData, setUserData,
        currentProfileID, setCurrentProfileID,
        currentProfileData, setCurrentProfileData,
        UIColor, setUIColor,
      }
    }>
      {children}
    </GlobalContext.Provider>
  );
};
