import { AsyncStorage } from "react-native";

export function getHash(email) {

}

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

export const currentUser = () => {
    AsyncStorage.getItem('currentItem').then((res) => {
        user = JSON.parse(res)
        return user
    }).catch((err) => console.log('error fetching current user details'))
}