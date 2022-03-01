import React, { useState } from 'react'
import axios from 'axios'

import { API_URL } from './AuthContext'

const PostContext = React.createContext()

const PostProvider = ({ children }) => {

    const getPost = async (token, id) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.get(API_URL + '/api/posts/' + String(id), config)
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

    return (
        <PostContext.Provider value={{ getPost, getPosts, addPost, deletePost, likePost }} >
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider }