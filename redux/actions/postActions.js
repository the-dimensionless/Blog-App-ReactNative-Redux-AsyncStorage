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
    return {
        type: types.CREATE_POST,
        post: post
    };
}

export function editPost(post) {
    return {
        type: types.EDIT_POST,
        post: post,
    }
};

export function deletePost(postId) {
    return {
        type: types.DELETE_POST,
        postId: postId
    }
};

export function likePost(postId, userId) {
    return {
        type: types.LIKE_POSTS,
        postId: postId,
        userId: userId
    }
}
