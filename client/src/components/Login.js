import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import useAuth from '../hooks/useAuth'

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { login } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        const response = await login(username, password)

        if (response.errors) {
            setErrors(response.errors)
            setLoading(false)
            return
        }

        sessionStorage.setItem('sessionToken', response.token)
        setLoading(false)
        navigate('/')
    }

    return (
        <div
            style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Card className='shadow' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    {errors && errors.map((err, idx) => <Alert key={idx} variant='danger'>{err.msg}</Alert>)}
                    <Form onSubmit={handleLogin}>
                        <FloatingLabel label='Username' className='mb-3' controlId='formUsername'>
                            <Form.Control type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        </FloatingLabel>
                        <FloatingLabel label='Password' className='mb-3' controlId='formPassword'>
                            <Form.Control type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </FloatingLabel>
                        <Button type='submit' >{loading ? <Spinner animation='border' variant='light' size='sm' /> : "Login"}</Button>
                        <Button onClick={() => navigate('/signup')} variant='link' >Signup</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default Login