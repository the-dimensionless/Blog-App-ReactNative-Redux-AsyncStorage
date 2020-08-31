import * as types from './actionTypes';
import { loadDummy, setDummy } from '../../components/Util';

export function loadPosts() {
    console.log('called');
    return dispatch => {
        return dispatch({
            type: types.LIST_POSTS,
            posts: posts
        });
    }
};

export function createPost(post) {
    return dispatch => {
        console.log('I have received data', post.title);
        // Mock API Calls/perist changes
        persistCreation(post)
        return dispatch({
            type: types.CREATE_POST,
            payload: post
        });
    }
};

export function editPost(post) {
    return dispatch => {
        // Mock API Calls/perist changes
        persistUpdation(post)
        return dispatch({
            type: types.EDIT_POST,
            payload: post,
        });
    }
};

export function deletePost(postId) {
    return dispatch => {
        // Mock API Calls/perist changes
        persistDeletion(postId)
        return dispatch({
            type: types.DELETE_POST,
            payload: postId
        });
    }
};

export function likePost(postId, likes) {
    return dispatch => {
        // Mock API Calls/persist changes
        persistLikes(postId, likes)
        return dispatch({
            type: types.LIKE_POSTS,
            postId: postId,
            likes: likes
        })
    }
}


function persistCreation(post) {
    let localList = []
    loadDummy().then((res) => {
        localList = res
    }).catch((err) => console.log('error while persisting new post', err))
    localList.push(post);
    setDummy(JSON.stringify(localList));
}

function persistUpdation(post) {
    let localList = []
    loadDummy().then((res) => {
        localList = res
        console.log('updation has ', localList)
    }).catch((err) => console.log('error while persisting update post', err))

    if (localList !== []) {
        localList.forEach((p) => {
            if (p["id"] === post["id"]) {
                p["title"] = post["title"],
                    p["slug"] = post["slug"],
                    p["body"] = post["body"],
                    p["likes"] = post["likes"]
                p["date"] = post["date"]
            }
        })
    }

    setDummy(JSON.stringify(localList));
}

function persistDeletion(postId) {
    let localList = []
    loadDummy().then((res) => {
        localList = res
    }).catch((err) => console.log('error while persisting update post', err))

    localList.filter((p) => {
        return p["id"] !== postId
    })

    setDummy(JSON.stringify(localList));
}

function persistLikes(postId, likes) {
    let localList = []
    loadDummy().then((res) => {
        localList = res
        console.log('persist like fetched ', localList);
    }).catch((err) => console.log('error while persisting update post', err))

    localList.forEach((p) => {
        if (p["id"] === postId) {
            p["likes"] = likes
        }
    })

    setDummy(JSON.stringify(localList));
}