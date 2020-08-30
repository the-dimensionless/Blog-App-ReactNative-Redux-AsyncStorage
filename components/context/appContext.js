import React, { createContext } from 'react';

const appContext = createContext({
    isLoggedIn: 'false',
    toggleLogin: () => {
        if (isLoggedIn === 'true') {
            isLoggedIn = 'false'
        } else {
            isLoggedIn = 'true'
        }
    },
});

export default appContext;