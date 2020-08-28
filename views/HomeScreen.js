import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostsList from '../components/PostsList';

const HomeScreen = (props) => {
    return (
        <View>
            <Text>Welcome to Home Page. Here is a list of all json data</Text>
            <PostsList />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default HomeScreen;