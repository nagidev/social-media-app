import React, { useState } from "react";

const Post = ({baseUrl, post}) => {
    const [show, setShow] = useState(false)
    const [liking, setLiking] = useState(false);
    const [disliking, setDisliking] = useState(false);
    const [liked, setLike] = useState(false);
    const [disliked, setDislike] = useState(false);

    const resetTransform = () => {
        setLiking(false);
        setDisliking(false)
    }

    return (
        <div
            className={`
                post flex-col flex-end card bg-light shadow
                ${liking?"liking":""}
                ${disliking?"disliking":""}
                `}
            onMouseOver={() => {setShow(true)}}
            onMouseLeave={() => {resetTransform(); setShow(false)}}
            onMouseUp={resetTransform}
            onMouseOut={resetTransform}
            >
            <img alt={post.title} src={baseUrl+post.image}/>
            <div className="flex-grow"></div>
            <div className={`card info bg-light shadow`}>
                <h3>{post.username}</h3>
                <p>{post.title}</p>
                <div className={`flex-row btn-group ${show?"peek":"hide"}`}>
                    <button
                        className={`btn ${liked?"bg-dark":"bg-light"}`}
                        onMouseDown={() => {setLiking(true); setLike(!liked); setDislike(false)}}
                        ><h3>Baa</h3></button>
                    <p className="btn bg-light">0</p>
                    <button
                        className={`btn ${disliked?"bg-dark":"bg-light"}`}
                        onMouseDown={() => {setDisliking(true); setDislike(!disliked); setLike(false)}}
                        ><h3>Ewe</h3></button>
                </div>
            </div>
        </div>
    );
};

export default Post;