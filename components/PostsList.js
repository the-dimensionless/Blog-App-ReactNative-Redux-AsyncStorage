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



function custom_sort(a, b) {
    return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
}
var your_array = [
    { lastUpdated: "2010/01/01" },
    { lastUpdated: "2009/01/01" },
    { lastUpdated: "2010/07/01" }
];

your_array.sort(custom_sort);

const styles = StyleSheet.create({
    container: {
        marginBottom: 50,
    },
    container2: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    }
});

function mapStateToProps(state) {
    return {
        posts: state.postReducer.posts,
    };
}


export default connect(mapStateToProps, { loadPosts, editPost, deletePost })(PostsList);