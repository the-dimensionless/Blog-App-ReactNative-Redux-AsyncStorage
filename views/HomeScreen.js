import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PostsList from '../components/PostsList';

const HomeScreen = (props) => {
    return (
        <View styles={styles.container}>
            <Button title='Create Post' onPress={() => {
                props.navigation.navigate('add');
            }} />
            <PostsList props={props} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default HomeScreen;