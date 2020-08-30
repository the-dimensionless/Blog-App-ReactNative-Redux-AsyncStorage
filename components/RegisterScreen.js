import React, { useState } from 'react';
import {
    StyleSheet, Text, View, TextInput, ScrollView, Image, Keyboard, TouchableOpacity, AsyncStorage,
    KeyboardAvoidingView, Alert
} from 'react-native';

import Loader from './Loader';

const RegisterScreen = props => {
    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');

    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');

    const handleSubmitButton = async () => {
        setErrortext('');
        /* if (!userName) {
            alert('Please fill Name');
            return;
        } */
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        //Show Loader
        setLoading(true);
        let res = await AsyncStorage.setItem(userEmail, userPassword, (err, res) => {
            Alert.alert('You have registered successfully !');
            setLoading(false);
            props.navigation.navigate('login');
        })
        setLoading(false);
        console.log(res);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../assets/icon.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserName => setUserEmail(UserName)}
                            //underlineColorAndroid="#FFFFFF"
                            placeholder="Enter Name"
                            placeholderTextColor="#F6F6F7"
                            autoCapitalize="sentences"
                            returnKeyType="next"

                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={pass => setUserPassword(pass)}
                            //underlineColorAndroid="#F6F6F7"
                            placeholder="Enter Email"
                            placeholderTextColor="#F6F6F7"
                            keyboardType="email-address"

                            returnKeyType="next"
                            //onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
                            blurOnSubmit={false}
                        />
                    </View>

                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}> {errortext} </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>Register</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
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
        color: '#FFFFFF',
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
        borderColor: 'white',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});