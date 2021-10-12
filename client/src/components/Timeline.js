import React, { useEffect, useState } from "react";
import axios from 'axios';

import Post from "./Post";

const Timeline = ({baseUrl, token}) => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        axios.get(baseUrl+'timeline', { params: { data : token } } )
            .then((res) => {
                setPosts(res.data)
            })
    }, [baseUrl, token])

    if (!posts) return (<></>)

    return (
        <div className="flex-center visible">
            <div className="w-75 flex-center" id="timeline">
                {posts.map(post => (
                    <Post baseUrl={baseUrl} post={post} />
                ))}
            </div>
        </div>
    )
};

export default Timeline;