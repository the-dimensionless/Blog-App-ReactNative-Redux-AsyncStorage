/* A reducer takes state and action as input and returns a new state
(state, action) => newState 
Reducers must be pure functions: Produce no side effects

FORBIDDEN in Reducers:

1. Mutating arguments
2. Performing side effects like API calls, routing,etc
3. Never call non-pure functions
*/

import * as types from '../actions/actionTypes';

function postReducer(state, action) {
    switch (action.type) {
        case types.LIST_POSTS:
            return { ...state };
        case types.CREATE_POST:
            return {
                ...state,
                posts: state.posts.concat(action.payload)
            };
        case types.EDIT_POST:
            return {
                ...state,
                posts: state.posts.map(
                    (content, i) => content.id === action.payload.id ? {
                        ...content,
                        title: action.payload.title,
                        slug: action.payload.slug,
                        authorId: action.payload.authorId,
                        date: action.payload.date
                    } : content)
            };
        case types.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            };
        case types.LIKE_POSTS:
            return {
                ...state,
                posts: state.map(
                    (content, i) => content.id === action.payload.id ?
                        {
                            ...content,
                            likes: likes + 1
                        } : content
                )
            };
        default:
            return state;
    }
}

export default postReducer;