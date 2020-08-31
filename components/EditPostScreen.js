import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { editPost, deletePost, likePost } from '../redux/actions/postActions';
import { currentUser } from './Util';

let uid;
let user;
const EditPostScreen = (props) => {
    let local = props.route.params
    useEffect(() => {
        local = props.route.params
        currentUser().then((res) => {
            user = JSON.parse(res)
            if (user["id"] === local.authorId) {
                setCanEdit(true)
            }
        })
    }, []);

    let [canEdit, setCanEdit] = useState(false);

    const [title, setTitle] = useState(local.title);
    const [slug, setSlug] = useState(local.slug);
    const [body, setBody] = useState(local.body);
    const [date, setDate] = useState(local.date);

    const [likes, setLikes] = useState(local.likes.length);
    const [likelist, setLikeList] = useState(local.likes);

    const [view, setView] = useState(true);

    function readyToEdit() {
        setView(false);
        setCanEdit(true);
    }

    function update() {
        let p = {
            id: local.id,
            title: title,
            slug: slug,
            body: body,
            date: new Date().toDateString(),
            authorId: local.authorId,
            likes: likelist
        }

        props.editPost(p);
        // console.log('Sent for updation');
        props.navigation.navigate('Home');
    }

    function doDelete() {
        props.deletePost(local.id);
        //console.log('Sent for deletion');
        props.navigation.navigate('Home');
    }

    function toggleLike() {

        let localList = likelist
        console.log('before ', localList)

        if (likelist.includes(user["id"])) {
            localList = likelist.filter((id) => {
                return id !== user["id"]
            })
            console.log('fter removing localList is ', localList)

            setLikeList(localList)
            setLikes(likes - 1)
        } else {

            localList = [...likelist, user["id"]]
            setLikeList(localList)
            console.log('after  adding localList is ', localList)
            setLikes(likes + 1)
        }
        console.log('after ', likelist)
        props.likePost(local.id, localList);

    }

    return (
        <>
            <View style={styles.card}>
                <View style={styles.container}>
                    <TextInput multiline={true} style={styles.title} value={title} editable={canEdit} onChangeText={
                        (text) => setTitle(text)
                    } />

                    <TextInput style={styles.slug} defaultValue={slug} editable={canEdit} onChangeText={
                        (text) => setSlug(text)} />

                    <TextInput multiline={true} style={styles.body} value={body} editable={canEdit} onChangeText={
                        (text) => setBody(text)
                    } />

                    <Text style={styles.date} >{date}</Text>
                </View>
            </View>

            <View style={styles.actionCard}>
                <View style={styles.actions} >
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => toggleLike()}>
                            <Image
                                style={styles.image}
                                source={require('../assets/like.png')}
                            />
                        </TouchableOpacity>
                        <Text title='5' style={styles.likes} > {likes} </Text>
                    </View>

                    <View style={styles.button}>
                        {canEdit && view && <Button title='Edit' onPress={() => readyToEdit()} />}
                    </View>

                    <View style={styles.button}>
                        {canEdit && !view && <Button title='Update' onPress={() => update()} />}
                    </View>

                    <View style={styles.button}>
                        {canEdit && view && <Button title='Delete' onPress={() => doDelete()} />}
                    </View>
                </View>


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
        color: 'grey',
        alignContent: 'flex-end'
    },

    likes: {
        padding: 5,
        fontSize: 15,
        marginLeft: 25
    },

    image: {
        width: 40,
        height: 40,
        marginLeft: 19
    },

    body: {
        padding: 12

    },

    actions: {
        flexDirection: "row",
    },
    actionCard: {
        flex: 1,
        alignContent: "stretch",
        //justifyContent: "stretch"
    },
    button: {
        width: '20%',
        padding: 5,
        marginLeft: 3
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

export default connect(mapStateToProps, { editPost, deletePost, likePost })(EditPostScreen);
