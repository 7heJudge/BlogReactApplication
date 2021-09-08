import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://bloggy-api.herokuapp.com/"
});

export const postsAPI = {
    getPosts() {
        return instance
            .get(`posts`)
            .then(response => response.data)
    },
    getComments(postId) {
        return instance
            .get(`posts/${postId}?_embed=comments`)
            .then(response => response.data)
    },
    addNewPost(title, body) {
        return instance
            .post(`posts`, {title, body})
    },
    updatePost(postId, title, body) {
        return instance
            .put(`posts/${postId}`, {title, body})
    },
    deletePost(postId) {
        return instance
            .delete(`posts/${postId}`)
    },
    addComment(postId, body) {
        return instance
            .post(`comments`, {postId, body})
    }
};