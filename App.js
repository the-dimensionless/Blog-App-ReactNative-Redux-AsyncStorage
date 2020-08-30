import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './views/HomeScreen';
import EditPostScreen from './components/EditPostScreen';
import AddPostScreen from './components/AddPostScreen';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

import { Provider } from 'react-redux';
import store from './redux/configureStore';

const authStack = createStackNavigator();
const AuthStack = (props) => (
  <authStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }} initialRouteName="login">
    <authStack.Screen name="login" component={LoginScreen} options={{
      title: 'Login to continue'
    }} />
    <authStack.Screen name="register" component={RegisterScreen} options={{
      title: 'Register to continue'
    }} />

    <authStack.Screen name="Home" component={HomeScreen} options={{
      title: 'Welcome'
    }, { headerLeft: null }} />

    <authStack.Screen name="add" component={AddPostScreen} options={{
      title: 'Add Post'
    }} />

    <authStack.Screen name="edit" component={EditPostScreen} options={{
      title: 'Edit Post'
    }} />
  </authStack.Navigator>
)

export default function App() {

  let [nav, setNav] = useState('dummy')
  let isAuth = async () => {
    await AsyncStorage.getItem('isLoggedIn').then((res) => {
      console.log('data value is', res);
      setNav(res)
      return res;
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    console.log('data value read is ', nav);
    value = isAuth();
    console.log('after function call value is ', nav);
  })

  return (
    <Provider store={store()}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
