import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { editPost, deletePost } from '../redux/actions/postActions';

let uid;
const EditPostScreen = (props) => {

    //let local = props.posts[0];
    let local = props.route.params
    useEffect(() => {
        console.log(props);
        local = props.route.params
        console.log('Id of post recievd', local.id);

    }, []);

    let [canEdit, setCanEdit] = useState(true);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');

    const [likes, setLikes] = useState('');

    const [view, setView] = useState(true);

    function readyToEdit() {
        setView(false);
        setCanEdit(true);
    }

    function update() {
        let p = {
            id: local.id,
            title: local.title,
            slug: local.slug,
            body: local.bug,
            date: new Date().toDateString(),
            authorId: local.authorId
        }

        props.editPost(p);
        props.navigation.navigate('Home');

    }

    function doDelete() {
        props.deletePost(local.id);
        console.log('Sent for deletion');
        props.navigation.navigate('Home');
    }


    return (
        <>
            <View style={styles.card}>
                <View style={styles.container}>
                    <TextInput style={styles.title} defaultValue={local.title} editable={canEdit} onChangeText={
                        (text) => setTitle(text)
                    } />

                    <TextInput style={styles.slug} defaultValue={local.slug} editable={canEdit} onChangeText={
                        (text) => setSlug(text)} />

                    <TextInput style={styles.body} defaultValue='Here will be Body' editable={canEdit} onChangeText={
                        (text) => setBody(text)
                    } />

                    <Text style={styles.date} >{local.date}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.actions} >
                    {canEdit && view && <Button title='Edit' onPress={() => readyToEdit()} />}

                    {canEdit && !view && <Button title='Update' onPress={() => update()} />}

                    {canEdit && view && <Button title='Delete' onPress={() => doDelete()} />}
                </View>
                <Image
                    style={styles.image}
                    source={require('../assets/like.png')}
                />
                <Text title='5' style={styles.likes} />

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        flex: 1,
    },

    container: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'yellow',
        backgroundColor: '#90ee90',
        shadowOpacity: 25,
        borderRadius: 23,
        height: 270,
    },

    title: {
        padding: 3,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: 'center'
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
    },

    likes: {

    },

    image: {
        width: 50,
        height: 50,
    },

    body: {

    },

    actions: {
        position: "relative"
    }



});

function mapStateToProps(state) {
    return {
        posts: state.postReducer.posts.filter((post) => {
            if (post.id === uid)
                return true;
        }),
    };
}

export default connect(mapStateToProps, { editPost, deletePost })(EditPostScreen);

/*  <Image
                style={styles.edit}
                source={require('../assets/edit.png')}
            />

            <Image
                style={styles.delete}
                source={require('../assets/delete.png')}
            /> */