import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { createPost } from '../redux/actions/postActions';
import { currentUser } from './Util';

const AddPostScreen = (props) => {

    useEffect(() => {
        currentUser().then((res) => {
            user = JSON.parse(res)
            setAuthorId(user["id"])

            console.log(user["id"], ' id is creating files')
            console.log(authorId, ' id is creating files')
        })
    }, [])

    let [postId, setPostId] = useState(Math.max.apply(Math, props.posts.map(function (o) { return o["id"]; })) + 1);
    let [postTitle, setPostTitle] = useState('');
    let [postSlug, setPostSlug] = useState('');
    let [postBody, setPostBody] = useState('');

    let [authorId, setAuthorId] = useState(0)


    function submitForm() {
        const post = {
            id: postId,
            title: postTitle,
            slug: postSlug,
            body: postBody,
            date: new Date().toDateString(),
            authorId: authorId,
            likes: []
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

                <TextInput style={styles.textBody} multiline={true} numberOfLines={10} placeholder="Enter Body" onChangeText={(text) => setPostBody(text)}
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
        borderBottomWidth: 1,
        borderColor: '#f8f8f8'
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
        posts: state.postReducer.posts,
    };
}

export default connect(mapStateToProps, { createPost })(AddPostScreen);