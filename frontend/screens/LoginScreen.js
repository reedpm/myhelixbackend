import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet,
  Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, dbURI} from '../GlobalContext';
import {colors} from '../styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {setUserData, setCurrentProfileID} = useGlobalContext();


  const handleLogin = async () => {
    try {
      const response = await fetch(dbURI + 'signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        console.log('response', response);
        // Handle unsuccessful login
        Alert.alert('Login Failed', 'Invalid email or password');
        return;
      }

      const data = await response.json();
      console.log('data in login', data);
      console.log('Login successful!', data);

      // Update global state with user data
      setUserData({...data});
      setCurrentProfileID(data.personalProfile);


      navigation.navigate('AppTabs', {
        screen: 'Profile',
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
