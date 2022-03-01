import { useContext } from 'react'
import { PostContext } from '../contexts/PostContext'

const usePosts = () => {
    return useContext(PostContext)
}

export default usePosts