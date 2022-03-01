import React, { useEffect, useState } from 'react'
import { PostProvider } from '../contexts/PostContext'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

import Timeline from './Timeline'

import useAuth from '../hooks/useAuth'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const { user, getUser } = useAuth()

    const loadUser = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            setLoading(true)
            try {
                await getUser(token)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <PostProvider>
            <Container style={{ maxWidth: '40rem' }} className='mt-3' >
                {loading
                    ?
                    <div className='text-center'>
                        <Spinner animation='border' role='status' variant='primary'>
                            <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                    </div>
                    : user
                        ? <Timeline />
                        : <h2 className='text-center'><a href='/login'>Log in</a> to explore!</h2>
                }
            </Container>
        </PostProvider>
    )
};

export default Home;