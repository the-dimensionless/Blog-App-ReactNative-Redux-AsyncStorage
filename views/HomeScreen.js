import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PostsList from '../components/PostsList';

const HomeScreen = (props) => {
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.buttonGroup}>
                    <View style={styles.children}>
                        <Button title='Create Post' onPress={() => {
                            props.navigation.navigate('add');
                        }} />
                    </View>

                    <View style={styles.children}>
                        <Button title=' Logout' onPress={() => {
                            props.navigation.navigate('add');
                        }} />
                    </View>
                </View>
                <PostsList props={props} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",

    },
    main: {
        flex: 1,
    },
    children: {
        width: '50%',
        padding: 6
    },
    buttonGroup: {
        flexDirection: "row"
    }
});

export default HomeScreen;