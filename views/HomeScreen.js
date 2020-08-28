import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostsList from '../components/PostsList';

const HomeScreen = (props) => {
    return (
        <View>
            <PostsList props={props} />
        </View>
    );
};

const styles = StyleSheet.create({


});

export default HomeScreen;