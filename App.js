import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './views/HomeScreen';
import EditPostScreen from './components/EditPostScreen';
import AddPostScreen from './components/AddPostScreen';
import Logout from './components/Logout';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

import { Provider } from 'react-redux';
import createStore from './redux/configureStore';
import initialState from './redux/reducers/initialState';

import appContext from './components/context/appContext';

export default function App() {

  let [nav, setNav] = useState('dummy')
  let isAuth = async () => {
    await AsyncStorage.getItem('isLoggedIn').then((res) => {
      setNav(res)
      if (res) {
        console.log('something', res)
        // toggleLogin();
        console.log(isLoggedIn, ' is new value')
      } else {
        console.log('nothing inside')
      }
      return res;
    }).catch((err) => console.log(err))
  }


  const setLog = () => AsyncStorage.setItem('isLoggedIn', 'true');

  const { isLoggedIn, toggleLogin } = useContext(appContext);

  useEffect(() => {
    //setLog()
    console.log('----------------')
    console.log('is logged in ? ', isLoggedIn);
    isAuth();
    console.log('after function call value is ', isLoggedIn);
  })

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
    }} initialRouteName="login" //initialRouteName={nav === 'true' ? "Home" : "login"}
    >
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
      <authStack.Screen name="logout" component={Logout} options={{
        title: 'Logout'
      }} />
    </authStack.Navigator >
  )

  return (
    <Provider store={createStore()}>
      <appContext.Provider value={isLoggedIn, toggleLogin}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </appContext.Provider>
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
