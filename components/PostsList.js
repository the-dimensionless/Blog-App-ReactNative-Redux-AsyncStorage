import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Post from './Post';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadPosts } from '../redux/actions/postActions';
import { ScrollView } from 'react-native-gesture-handler';

const PostsList = (props) => {
    /* useEffect(() => {
        console.log(props.posts);
    }, []); */
    const posts = props.posts.map(post => {
        return <Post post={post} key={post.id} />

    })
    return (
        <ScrollView style={styles.container}>
            <View >
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
    conatiner: {
    }
});

function mapStateToProps(state) {
    return {
        posts: state.postReducer.posts,
    };
}


export default connect(mapStateToProps, { loadPosts })(PostsList);