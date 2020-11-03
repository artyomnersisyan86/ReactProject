import React from "react";
import {Post} from "./post/Post";
import s from "./Mypost.module.css"

export const MyPosts = (props) => {
    let postsElements = props.posts.map((p, i) => {
        return <Post key={i} message={p.message} likesCount={p.likesCount}/>
    })
    let newPostElement = React.createRef();

    let addPost = () => {
        let text = newPostElement.current.value
      props.addPost(text);
    }
    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <div>
                <div><textarea ref={newPostElement}></textarea></div>
                <div>
                    <button onClick={addPost}>Add</button>
                </div>
            </div>
            {postsElements}
        </div>
    )
}