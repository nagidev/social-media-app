import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons'

import useAuth from '../hooks/useAuth'

const Profile = () => {
    const { user, getUser, deleteUser, logout } = useAuth()
    const location = useLocation()

    const handleDeleteUser = async () => {
        try {
            const token = sessionStorage.getItem('sessionToken')
            const response = await deleteUser(token)
            if (response === 'User deleted.') logout()
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) getUser(token)
    }, [])

    return (
        user
            ? <div
                style={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Card className='shadow text-center' style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faUser} size='2xl' className='p-5 m-5 shadow rounded-circle' />
                            <br />
                            {user.username}
                        </Card.Title>
                        <Card.Text>This is your profile. Expect more features soon!</Card.Text>
                        <Button onClick={logout} variant='secondary' className='m-1'><FontAwesomeIcon icon={faRightFromBracket} /> Log Out </Button>
                        <Button onClick={handleDeleteUser} variant='danger' className='m-1'><FontAwesomeIcon icon={faTrash} /> Delete User </Button>
                    </Card.Body>
                </Card>
            </div>
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default Profile