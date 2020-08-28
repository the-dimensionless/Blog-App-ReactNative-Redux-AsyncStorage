import React from 'react';
import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';


const Post = ({ post }) => {
    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.title}>{post.title}</Text>

                <Text style={styles.slug}>{post.slug}</Text>

                <Text style={styles.date}>{post.date}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 5,
        flex: 1
    },

    container: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'yellow',
        backgroundColor: '#009387',
        shadowOpacity: 25,
        borderRadius: 23,
        height: 130
    },

    title: {
        padding: 3,
        fontSize: 21,
        fontWeight: "bold",
        textAlign: 'center'
    },

    slug: {
        paddingTop: 3,
        fontSize: 15,
        paddingBottom: 3
    },

    date: {
        paddingTop: 7,
        color: 'white',
        alignContent: 'flex-end'
    }

});

export default Post;