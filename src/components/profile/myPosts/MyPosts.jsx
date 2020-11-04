import React from "react";
import {Post} from "./post/Post";
import s from "./Mypost.module.css"

export const MyPosts = (props) => {
    let postsElements = props.posts.map((p, i) => {
        return <Post key={i} message={p.message} likesCount={p.likesCount}/>
    })
    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    }
    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text);
    }
    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <div>
                <div><textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/></div>
                <div>
                    <button onClick={addPost}>Add</button>
                </div>
            </div>
            {postsElements}
        </div>
    )
}