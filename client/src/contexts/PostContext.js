import React from 'react'
import axios from 'axios'

import { API_URL } from './AuthContext'

const PostContext = React.createContext()

const PostProvider = ({ children }) => {

    const getPost = async (token, id) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.get(API_URL + '/api/posts/id/' + String(id), config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const getPosts = async (token) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.get(API_URL + '/api/posts', config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const getPostsBy = async (token, username) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.get(API_URL + '/api/posts/' + username, config)
            
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const addPost = async (token, post) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.post(API_URL + '/api/posts/', post, config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const deletePost = async (token, id) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.delete(API_URL + '/api/posts/' + String(id), config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const likePost = async (token, id) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.put(API_URL + '/api/posts/like/' + String(id), {}, config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const addComment = async (token, id, text) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.put(API_URL + '/api/posts/comment/' + String(id), {text}, config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const delComment = async (token, id, cid) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.put(API_URL + '/api/posts/comment/' + String(id) + '/del/' + String(cid), {}, config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    return (
        <PostContext.Provider value={{ getPost, getPosts, getPostsBy, addPost, deletePost, likePost, addComment, delComment }} >
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider }