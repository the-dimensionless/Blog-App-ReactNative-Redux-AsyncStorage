import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Post from './Post';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadPosts, editPost, deletePost } from '../redux/actions/postActions';
import { ScrollView } from 'react-native-gesture-handler';

const PostsList = (props) => {
    /* useEffect(() => {
        console.log(props.posts);
    }, []); */

    const posts = props.posts.map(post => {
        return <Post post={post} navigation={props.props.navigation} key={post.id} />

    })
    return (
        <ScrollView style={styles.container}>
            <View style={styles.container2}>
                {posts}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    container2: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 35
    }
});

function mapStateToProps(state) {
    return {
        posts: state.postReducer.posts,
    };
}


export default connect(mapStateToProps, { loadPosts, editPost, deletePost })(PostsList);