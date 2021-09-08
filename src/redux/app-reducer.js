import {postsAPI} from "../api/api";

const SET_POSTS = "SET_POSTS",
    SET_COMMENTS = "SET_COMMENTS",
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    ADD_NEW_POST = "ADD_NEW_POST",
    UPDATE_POST = "UPDATE_POST",
    TOGGLE_IS_EDIT = "TOGGLE_IS_EDIT",
    DELETE_POST = "DELETE_POST",
    ADD_COMMENT = "ADD_COMMENT";

const initialState = {
    posts: [],
    comments: [],
    isFetching: false,
    isEdit: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state,
                posts: action.posts
            }
        }
        case SET_COMMENTS: {
            return {
                ...state,
                comments: action.comments
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case ADD_NEW_POST: {
            return {
                ...state,
                posts: [...state.posts, {id: action.postId, title: action.title, body: action.body}]
            }
        }
        case UPDATE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post.id === action.postId ? {
                    title: action.title,
                    body: action.body
                } : post)
            }
        }
        case TOGGLE_IS_EDIT: {
            return {
                ...state,
                isEdit: action.isEdit
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                comments: [...state.comments, {postId: action.postId, body: action.body}]
            }
        }
        default:
            return state;
    }
};

export default appReducer;
export const setPosts = (posts) => ({type: SET_POSTS, posts})
export const setComments = (comments) => ({type: SET_COMMENTS, comments})
export const addNewPost = (postId, title, body) => ({type: ADD_NEW_POST, postId, title, body})
export const updatePost = (postId, title, body) => ({type: UPDATE_POST, postId, title, body})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsEdit = (isEdit) => ({type: TOGGLE_IS_EDIT, isEdit});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const addComment = (postId, body) => ({type: ADD_COMMENT, postId, body});

export const requestPosts = () => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const data = await postsAPI.getPosts()
            dispatch(setPosts(data));
            dispatch(toggleIsFetching(false));
        } catch (e) {
            return e;
        }

    };
};

export const requestComments = (postId) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const data = await postsAPI.getComments(postId);
            dispatch(setComments(data.comments));
            dispatch(toggleIsFetching(false));
        } catch (e) {
            return e;
        }

    };
};

export const requestAddPost = (title, body) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const data = await postsAPI.addNewPost(title, body);
            dispatch(addNewPost(data.data.id, data.data.title, data.data.body));
            dispatch(toggleIsFetching(false));
        } catch (e) {
            return e;
        }
    };
};

export const requestUpdatePost = (postId, title, body) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const data = await postsAPI.updatePost(postId, title, body)
            dispatch(updatePost(data.id, data.title, data.body));
            dispatch(toggleIsFetching(false));
            dispatch(toggleIsEdit(false));
        } catch (e) {
            return e;
        }
    };
};

export const requestDeletePost = (postId) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const data = await postsAPI.deletePost(postId)
            dispatch(deletePost(postId));
            dispatch(toggleIsFetching(false));
        } catch (e) {
            return e;
        }
    };
};

export const requestAddComment = (postId, body) => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching(true));
            const data = await postsAPI.addComment(postId, body)
            dispatch(addComment(data.data.postId, data.data.body));
            dispatch(toggleIsFetching(false));
            // dispatch(requestComments(data.data.postId));
        } catch (e) {
            return e;
        }
    };
};

