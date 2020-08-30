import React, { useEffect } from 'react';
import { logoutUser } from './Util';

const Logout = (props) => {

    useEffect(() => {
        console.log('here is logout')
        logoutUser().then((res) => {
            console.log('final response is ', res)
            alert('Logging out')

            props.navigation.navigate('login');

        }).catch((e) => console.log('err is ', e))
    }, []);

    return (
        null
    );
};

export default Logout;