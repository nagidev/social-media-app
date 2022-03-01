import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://192.168.1.38:3001'
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const getUser = async (token) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.get(API_URL+'/api/auth', config)
            setUser(response.data)
            return response.data
        } catch (err) {
            setUser(null)
            return err.response.data
        }
    }
    const getUsers = async (token) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.get(API_URL+'/api/users', config)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
    const signup = async (username, password) => {
        try {
            const response = await axios.post(API_URL+'/api/users', {username, password})
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
    const login = async (username, password) => {
        try {
            const response = await axios.post(API_URL+'/api/auth', {username, password})
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
    const logout = () => {
        sessionStorage.removeItem('sessionToken')
        setUser(null)
    }
    const deleteUser = async (token) => {
        const config = { headers: { 'x-auth-token': token } }

        try {
            const response = await axios.delete(API_URL+'/api/users', config)
            sessionStorage.removeItem('sessionToken')
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    return (
        <AuthContext.Provider value={{ user, getUser, getUsers, signup, login, logout, deleteUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider, API_URL }