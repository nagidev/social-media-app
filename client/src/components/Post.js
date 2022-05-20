import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'

import useAuth from '../hooks/useAuth'
import usePosts from '../hooks/usePosts'

const Post = ({ id, user_id, username, text, filePath, likes, comments }) => {
    const [curLikes, setLikes] = useState(likes)
    const [curComments, setComments] = useState(comments)
    const [newComment, setNewComment] = useState('')
    const [showComments, setShowComments] = useState(false)

    const { _user } = useAuth()
    const { likePost, deletePost, addComment, delComment } = usePosts()
    const navigate = useNavigate()

    const isLiked = (givenLikes) => givenLikes.filter(curUser => (curUser.user === _user._id)).length == 1
    const [liked, setLiked] = useState(isLiked(likes))

    const handleLike = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            const newLikes = await likePost(token, id)
            setLikes(newLikes)
            setLiked(isLiked(newLikes))
        }
    }

    const handleDelete = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            await deletePost(token, id)
            navigate('/home')
        }
    }

    const handleAddComment = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            const newComments = await addComment(token, id, newComment)
            setComments(newComments)
            setNewComment('')
        }
    }

    const handleDelComment = async (cid) => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            const newComments = await delComment(token, id, cid)
            setComments(newComments)
        }
    }

    const likeCount = (props) => (
        <Tooltip {...props}>{curLikes.length}</Tooltip>
    )

    const commentCount = (props) => (
        <Tooltip {...props}>{comments.length}</Tooltip>
    )

    return (
        <Card className='my-3'>
            <Card.Img variant='top' src={filePath} />
            <Card.Body>
                <Card.Text className='post-user' onClick={() => { navigate(`/users/${username}`) }}>{username}</Card.Text>
                <Card.Title className='post-text' onClick={() => { console.log('Click!') }}>{text}</Card.Title>
                <div className='d-flex flex-row-reverse align-items-center'>
                    <OverlayTrigger overlay={likeCount} delay={{ hide: 400 }}>
                        <Button variant={`${liked ? 'primary' : 'link'}`} onClick={handleLike} ><FontAwesomeIcon icon={faHeart} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={commentCount} delay={{ hide: 400 }}>
                        <Button variant='link' onClick={() => setShowComments(!showComments)}><FontAwesomeIcon icon={faMessage} /></Button>
                    </OverlayTrigger>
                    {(_user._id === user_id) &&
                        <Button variant='link' onClick={handleDelete} className='text-danger'>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    }
                </div>
                <Collapse in={showComments} className='mt-3'>
                    <div>
                        <Form>
                            <InputGroup>
                                <Form.Control type='text' placeholder='New comment...' value={newComment} onChange={(e) => { setNewComment(e.target.value) }} />
                                <Button onClick={handleAddComment}>Post</Button>
                            </InputGroup>
                        </Form>
                        {curComments.map(({ _id, user, username, text }) => (
                            <Container key={_id}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <p className='my-auto'><b>{username}</b> : {text}</p>
                                    {(_user._id === user) &&
                                        <Button variant='link' onClick={() => { handleDelComment(_id) }} className='text-danger'>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    }
                                </div>
                            </Container>
                        ))}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default Post;