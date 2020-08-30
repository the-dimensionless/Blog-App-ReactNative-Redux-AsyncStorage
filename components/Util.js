import { AsyncStorage } from "react-native";

export function getHash(email) {

}

export const isAuth = async () => {
    await AsyncStorage.getItem('isLoggedIn').then((res) => {
        console.log('data value eead is', res);
        return res;
    }).catch((err) => console.log(err))
}

export const logoutUser = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    await AsyncStorage.setItem('user', '');
    return;
}