import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faShareNodes, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'

import useAuth from '../hooks/useAuth'
import usePosts from "../hooks/usePosts"

const Post = ({ id, user_id, username, text, likes, comments }) => {
    const [curLikes, setLikes] = useState(likes)

    const { user } = useAuth()
    const { likePost, deletePost } = usePosts()
    const navigate = useNavigate()

    const handleLike = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            const newLikes = await likePost(token, id)
            setLikes(newLikes)
        }
    }

    const handleDelete = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            await deletePost(token, id)
            navigate('/')
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
            <Card.Body>
                <Card.Text>{username}</Card.Text>
                <Card.Title>{text}</Card.Title>
                <div className='d-flex flex-row justify-content-end align-items-center'>
                    <OverlayTrigger overlay={likeCount} delay={{hide: 400}}>
                        <Button variant='link' onClick={handleLike} ><FontAwesomeIcon icon={faHeart} /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={commentCount} delay={{hide: 400}}>
                        <Button variant='link'><FontAwesomeIcon icon={faMessage} /></Button>
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
            </Card.Body>
        </Card>
    );
};

export default Post;