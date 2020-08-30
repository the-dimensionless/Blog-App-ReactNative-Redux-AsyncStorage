import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PostsList from '../components/PostsList';

const HomeScreen = (props) => {
    return (
        <View style={styles.main}>
            <View styles={styles.container}>
                <Button title='Create Post' onPress={() => {
                    props.navigation.navigate('add');
                }} />
                <PostsList props={props} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {


    },
    main: {
        flex: 1,
    }
});

export default HomeScreen;