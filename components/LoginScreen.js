import React, { useState, useRef, useEffect, useContext } from 'react';
import {
    StyleSheet, Text, View, TextInput, ScrollView, Image, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, AsyncStorage, Alert
} from 'react-native';

import Loader from './Loader';
import { isAuth, currentUser } from './Util';
import appContext from './context/appContext';

const LoginScreen = (props) => {
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');

    let [loading, setLoading] = useState('');
    let [info, setInfo] = useState('');

    const _emailinput = useRef('');
    const _passwordinput = useRef('');

    useEffect(() => {
        console.log('-------login Screen-------')
        isAuth().then((res) => {
            console.log('Has anyone logged in ? ', res)
            if (res === 'true') {
                props.navigation.navigate('Home')
            }
        }).catch((err) => console.log('error checking login', err))
    }, [])

    const handleLogin = () => {
        if (!userEmail) {
            Alert.alert('email id cannot be empty');
            return;
        }
        if (!userPassword) {
            Alert.alert('password cannot be empty');
            return;
        }
        setLoading(true);
        AsyncStorage.getItem('listOfUsers').then((res) => {
            setLoading(false);
            //console.log('trying to find user Id')
            if (res) {
                let flag = -1
                let user = null
                let l = JSON.parse(res)
                l.forEach(element => {
                    if (element["email"] === userEmail) {
                        user = element
                        flag = 0
                    }
                });
                if (flag === -1) {
                    Alert.alert(`No account for ${userEmail}`);
                    setInfo('No such email found');
                    return
                }
                if (user["password"] !== userPassword) {
                    Alert.alert('Password incorrect');
                    setInfo('wrong password');
                    return
                } else {
                    AsyncStorage.setItem('userLoggedIn', 'true', (err, res) => {
                        AsyncStorage.setItem('currentUser', JSON.stringify(user), (err, res) => {
                            Alert.alert(`${userEmail} Logging in`);
                            props.navigation.navigate('Home');
                            return;
                        })
                    })
                }

            } else {
                Alert.alert('Some error with storage space, could not load userList');
            }
        })
    }


    /*  const handleLogin = () => {
         if (!userEmail) {
             Alert.alert('email id cannot be empty');
             return;
         }
         if (!userPassword) {
             Alert.alert('password cannot be empty');
             return;
         }
         setLoading(true);
         AsyncStorage.getItem(userEmail, (err, res) => {
             setLoading(false);
             console.log(err, res);
             if (res) {
                 if (res !== userPassword) {
                     Alert.alert('Password incorrect');
                     setInfo('wrong password');
                 } else {
                     AsyncStorage.setItem('userLoggedIn', 'true', (err, res) => {
                         //Alert.alert(`${userEmail} Logging in`);
 
                         let user = {
                             email: userEmail,
                             password: userPassword,
                             id: 1
                         }
 
                         AsyncStorage.setItem('user', JSON.stringify(user), (err, res) => {
                             Alert.alert(`${userEmail} Logging in`);
 
                             props.navigation.navigate('Home');
 
                             //props.navigation.goBack();
                             //props.navigation.navigate('drawer');
                             return;
                         })
                     })
                 }
 
             } else {
                 Alert.alert(`No account for ${userEmail}`);
                 setInfo('No such email found');
             }
         })
     }
  */

    return (
        <View style={StyleSheet.mainBody}>
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={{ marginTop: 100 }}>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../assets/icon.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }} />
                        </View>

                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={UserEmail => setUserEmail(UserEmail)}
                                //underlineColorAndroid="blue"
                                placeholder="Enter email" //dummy@abc.com
                                placeholderTextColor="#F6F6F7"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                ref={_emailinput}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    _passwordinput && _passwordinput.focus()
                                }
                                blurOnSubmit={false} />
                        </View>

                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={UserPassword => setUserPassword(UserPassword)}
                                //underlineColorAndroid="blue"
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#F6F6F7"
                                keyboardType="default"
                                ref={_passwordinput}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                            />
                        </View>

                        {info != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {info}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonTextStyle}>Login </Text>
                        </TouchableOpacity>
                        <Text style={styles.registerTextStyle}
                            onPress={() => props.navigation.navigate('register')}
                        >
                            Register now !!
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: 'black',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#7DE24E',
    },
    registerTextStyle: {
        color: '#ED2939',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default LoginScreen;