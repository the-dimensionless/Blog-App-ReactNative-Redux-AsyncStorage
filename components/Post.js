import React from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';

const Post = (props) => {
    return (
        <View>
            <Text>{props.post.title}</Text>

            <Text>{props.post.slug}</Text>

            <Text>{props.post.authorId}</Text>

            <Text>{props.post.data}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Post;