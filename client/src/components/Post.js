import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faShareNodes, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'

import useAuth from '../hooks/useAuth'
import usePosts from "../hooks/usePosts"

const Post = ({ id, user_id, username, text, filePath, likes, comments }) => {
    const [curLikes, setLikes] = useState(likes)
    //const [curComments, setComments] = useState(comments)
    const [showComments, setShowComments] = useState(false)

    const { user } = useAuth()
    const { likePost, deletePost } = usePosts()
    const navigate = useNavigate()

    const isLiked = (givenLikes) => givenLikes.filter(curUser => (curUser.user === user._id)).length == 1
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
                <Card.Text>{username}</Card.Text>
                <Card.Title>{text}</Card.Title>
                <div className='d-flex flex-row-reverse align-items-center'>
                    <OverlayTrigger overlay={likeCount} delay={{ hide: 400 }}>
                        <Button variant={`${liked?'primary':'link'}`} onClick={handleLike} ><FontAwesomeIcon icon={faHeart} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={commentCount} delay={{ hide: 400 }}>
                        <Button variant='link' onClick={() => setShowComments(!showComments)}><FontAwesomeIcon icon={faMessage} /></Button>
                    </OverlayTrigger>
                    <Button variant='link'>
                        <FontAwesomeIcon icon={faShareNodes} />
                    </Button>
                    {(user._id === user_id) &&
                        <Button variant='link' onClick={handleDelete} className='text-danger'>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    }
                </div>
                <Collapse in={showComments} className='mt-3'>
                    <Form>
                        <InputGroup>
                            <Form.Control type='text' placeholder='New comment...' />
                            <Button /*type='submit'*/>Post</Button>
                        </InputGroup>
                    </Form>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default Post;