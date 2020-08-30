import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { editPost, deletePost } from '../redux/actions/postActions';

let uid;
const EditPostScreen = (props) => {

    //let local = props.posts[0];
    let local = props.route.params
    useEffect(() => {
        /* console.log(props); */
        local = props.route.params
        /* console.log('Id of post recievd', local.id); */

    }, []);

    let [canEdit, setCanEdit] = useState(true);

    const [title, setTitle] = useState(local.title);
    const [slug, setSlug] = useState(local.slug);
    const [body, setBody] = useState(local.body);
    const [date, setDate] = useState(local.date);

    const [likes, setLikes] = useState(local.likes.length);

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
            body: local.bug,
            date: new Date().toDateString(),
            authorId: local.authorId
        }

        console.log('New value for slug is ', p.slug);
        props.editPost(p);
        console.log('Sent for updation');
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
                        <Image
                            style={styles.image}
                            source={require('../assets/like.png')}
                        />
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
        color: 'white',
        alignContent: 'flex-end'
    },

    likes: {
        padding: 5,
        fontSize: 15,
        marginLeft: 25
    },

    image: {
        width: 50,
        height: 50,
        marginLeft: 8
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
        marginLeft: 4
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
