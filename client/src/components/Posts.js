import React, { useEffect, useState } from 'react'
import usePosts from '../hooks/usePosts'

import { API_URL } from '../contexts/AuthContext'

import Spinner from 'react-bootstrap/Spinner'

import Post from './Post'

function Posts({ username }) {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

    const { getPosts, getPostsBy } = usePosts()

    const loadPosts = async () => {
        const token = sessionStorage.getItem('sessionToken')
        if (token) {
            setLoading(true)
            try {
                let response
                if (username) {
                    response = await getPostsBy(token, username)
                } else {
                    response = await getPosts(token)
                }
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
        <>
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
                        <Post
                            key={_id}
                            id={_id}
                            user_id={user}
                            username={username}
                            text={text}
                            filePath={filePath}
                            likes={likes}
                            comments={comments}
                        />
                    )
                })
            }
        </>
    )
}

export default Posts