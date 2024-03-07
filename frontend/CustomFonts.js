import {useFonts} from 'expo-font';

export const customFonts = () => {
  const [fontsLoaded] = useFonts({
    'LeagueSpartan-Regular':
        require('./assets/fonts/LeagueSpartan-Regular.ttf'),
    'LeageSpartan-Bold':
        require('./assets/fonts/LeagueSpartan-Bold.ttf'),
  });

  return {fontsLoaded};
};
