import * as types from './actionTypes';
import Data from '../../assets/data/data.json';

export function loadPosts() {
    return function (dispatch) {
        dispatch(loadPostsSuccess(Data.posts));
    }
}

export function loadPostsSuccess(posts) {
    return {
        type: types.LIST_POSTS,
        posts: posts
    }
};

export function createPost(post) {
    return dispatch => {
        return dispatch({
            type: types.CREATE_POST,
            payload: post
        });
    }
};

export function editPost(post) {
    return dispatch => {
        return dispatch({
            type: types.EDIT_POST,
            payload: post,
        });
    }
};

export function deletePost(postId) {
    return dispatch => {
        return dispatch({
            type: types.DELETE_POST,
            payload: postId
        });
    }
};

export function likePost(postId, userId) {
    return {
        type: types.LIKE_POSTS,
        postId: postId,
        userId: userId
    }
}
