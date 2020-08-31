import { AsyncStorage } from "react-native";
import Data from './../assets/data/data.json';

export const isAuth = async () => {
    let rt = ''
    await AsyncStorage.getItem('userLoggedIn').then((res) => {
        console.log('data value eead is', res);
        rt = res
        return res;
    }).catch((err) => console.log(err))
    return rt
}

export const logoutUser = async () => {
    await AsyncStorage.setItem('userLoggedIn', 'false');
    await AsyncStorage.setItem('currentUser', '');
    return;
}

export const currentUser = async () => {
    let obj = {}
    await AsyncStorage.getItem('currentUser').then((res) => {
        //console.log(res)
        obj = res
        return res
    }).catch((err) => console.log('error fetching current user details'))
    return obj
}

export const loadDummy = async () => {
    let d = []
    await AsyncStorage.getItem('dummyData').then((res) => {
        list = JSON.parse(res)
        if (list) {
            //console.log('to return ', list)
            return list
        }
        return d;
    })
    return d
}

export const setDummy = async (data) => {
    await AsyncStorage.setItem('dummyData', data)
}

export function helpLoadData() {
    let myData = Data
    loadDummy().then((res) => {
        console.log("data by helper function ", res)
        myData = [...res]
        if (res.length === 0) {
            readytobe = JSON.stringify(Data)
            console.log('Reinitiazing data')
            setDummy(readytobe)
            return myData
        } else {
            return res
        }
    }).catch((err) => console.log('error', err))
    return myData
}