import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// import useAuth from '../hooks/useAuth'

const Timeline = () => {
    const [post, setPost] = useState()

    //const { user } = useAuth()

    const handlePost = (e) => {
        e.preventDefault()
        console.log(post)
    }

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
        </Container>
    )
}

export default Timeline