import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { createPost } from '../redux/actions/postActions';

const AddPostScreen = (props) => {

    let [postId, setPostId] = useState('');
    let [postTitle, setPostTitle] = useState('');
    let [postSlug, setPostSlug] = useState('');
    let [postBody, setPostBody] = useState('');

    const postDate = '';
    const authorId = 1;

    function submitForm() {
        const post = {
            id: postId,
            title: postTitle,
            slug: postSlug,
            body: postBody,
            date: new Date().toDateString(),
            authorId: 1,
        }

        props.createPost(post);
        console.log('Sent for creation');
        props.navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.addPostForm}>
                <Text style={styles.header}>Create New Post</Text>

                <TextInput style={styles.textInput} placeholder="Enter Title" onChangeText={(text) => setPostTitle(text)}
                    underlineColorAndroid={'transparent'} />

                <TextInput style={styles.textInput} placeholder="Enter Slug" onChangeText={(text) => setPostSlug(text)}
                    underlineColorAndroid={'transparent'} />

                <TextInput style={styles.textBody} placeholder="Enter Body" onChangeText={(text) => setPostBody(text)}
                    underlineColorAndroid={'transparent'} />

                <TouchableOpacity style={styles.button} onPress={() => submitForm()}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft: 60,
        paddingRight: 60,
    },
    addPostForm: {
        alignSelf: 'stretch',

    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textInput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1
    },
    textBody: {
        alignSelf: 'stretch',
        height: 80,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'

    }
});

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { createPost })(AddPostScreen);