import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'

import Post from './Post'

import { API_URL } from '../contexts/AuthContext'
import usePosts from '../hooks/usePosts'

const Timeline = () => {
    const [post, setPost] = useState({})
    const [posts, setPosts] = useState([])
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const { getPosts, addPost } = usePosts()
    const navigate = useNavigate()

    const handlePost = async (e) => {
        e.preventDefault()

        const token = sessionStorage.getItem('sessionToken')
        const newPost = new FormData()
        if (post.text) newPost.append('text', post.text)
        if (post.file) newPost.append('file', post.file)

        const response = await addPost(token, newPost)

        if (response.errors) {
            setErrors(response.errors)
            return
        }

        setPosts([response, ...posts])
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
            <Card>
                <Card.Body>
                    {errors && errors.map((err, idx) => <Alert key={idx} variant='danger'>{err.msg}</Alert>)}
                    <Form onSubmit={handlePost}>
                        <Form.Control
                            type='text'
                            placeholder='New post...'
                            onChange={(e) => setPost({ ...post, text: e.target.value })}
                        />
                        {post.file &&
                            <div className='position-relative my-2'>
                                <Image src={URL.createObjectURL(post.file)} fluid className='rounded' />
                                <Button
                                    variant='danger'
                                    className='position-absolute top-0 end-0 px-3 py-2'
                                    onClick={() => setPost({ ...post, file: null })}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </Button>
                            </div>
                        }
                        <div className='d-flex justify-content-end'>
                            <Form.Control
                                type='file'
                                accept='image/*'
                                id='file'
                                className='d-none'
                                onChange={(e) => setPost({ ...post, file: e.target.files[0] })}
                            />
                            <Form.Label htmlFor='file' className='btn btn-link my-2'><FontAwesomeIcon icon={faImage} /></Form.Label>
                            <Button type='submit' className='my-2'>Post</Button>
                        </div>
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
                posts.map(({ _id, user, username, text, filePath, likes, comments }) => {
                    if (filePath) filePath = API_URL + '/' + filePath
                    return (
                        <Post key={_id} id={_id} user_id={user} username={username} text={text} filePath={filePath} likes={likes} comments={comments} />
                    )
                })
            }
        </Container>
    )
}

export default Timeline