import React from "react";
import { Post } from "./post/Post";
import s from "./Mypost.module.css"
import AddNewPostForm from "./addNewPostForm/AddNewPostForm";

export const MyPosts = React.memo( props => {
    let postsElements = props.posts.map((p, i) => {
        return <Post key={i} message={p.message} likesCount={p.likesCount}/>
    })
    let addNewPostText = (values) => {
        props.addPost(values.addPost);
    }
    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <AddNewPostForm onSubmit={addNewPostText}/>
            {postsElements}
        </div>
    )
})



