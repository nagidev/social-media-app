import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import { PostProvider } from '../contexts/PostContext'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Posts from './Posts'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons'

function User() {
    const { username } = useParams()
    const { _user, deleteUser, logout } = useAuth()

    const navigate = useNavigate()

    const handleDeleteUser = async () => {
        try {
            const token = sessionStorage.getItem('sessionToken')
            const response = await deleteUser(token)
            if (response === 'User deleted.') {
                logout()
                navigate('/')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Container style={{ maxWidth: '40rem' }} className='mt-3'>
            <Card className='align-items-center justify-content-center text-center'>
                <Card.Body>
                    <FontAwesomeIcon icon={faUser} size='2xl' className='p-3 m-3 bg-primary text-light rounded-circle' />
                    <Card.Title>{username}</Card.Title>
                    {(username == _user.username)
                        ?
                        <Button variant='danger' onClick={handleDeleteUser}>Delete Account <FontAwesomeIcon icon={faTrash} /></Button>
                        :
                        <Button>Follow <FontAwesomeIcon icon={faUserPlus} /></Button>
                    }
                </Card.Body>
            </Card>
            <PostProvider>
                <Posts username={username} />
            </PostProvider>
        </Container>
    )
}

export default User