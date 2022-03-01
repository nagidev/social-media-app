import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import Post from './Post'

import usePosts from '../hooks/usePosts'

const Timeline = () => {
    const [post, setPost] = useState()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const { getPosts, addPost } = usePosts()
    const navigate = useNavigate()

    const handlePost = async (e) => {
        e.preventDefault()
        
        const token = sessionStorage.getItem('sessionToken')
        await addPost(token, post)
        navigate('/')
    }

    const loadPosts = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            setLoading(true)
            try {
                const response = await getPosts(token)
                setPosts(response)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        loadPosts()
    }, [])

    return (
        <Container>
            <h1>Home</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handlePost}>
                        <Form.Control type='text' placeholder='New post...' onChange={(e) => setPost({ ...post, text: e.target.value })} />
                        <Button type='submit' className='my-2'>Post</Button>
                    </Form>
                </Card.Body>
            </Card>
            {loading
                ?
                <div className='text-center'>
                    <Spinner animation='border' role='status' variant='primary'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
                :
                posts.map(({ _id, user, username, text, likes, comments }) => (
                    <Post key={_id} id={_id} user_id={user} username={username} text={text} likes={likes} comments={comments} />
                ))
            }
        </Container>
    )
}

export default Timeline