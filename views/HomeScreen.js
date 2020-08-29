import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PostsList from '../components/PostsList';

const HomeScreen = (props) => {
    return (
        <View>
            <Button title='Create Post' onPress={() => {
                props.navigation.navigate('add');
            }} />
            <PostsList props={props} />
        </View>
    );
};

const styles = StyleSheet.create({


});

export default HomeScreen;