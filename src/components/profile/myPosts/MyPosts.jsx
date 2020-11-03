import React from "react";
import {Post} from "./post/Post";
import s from "./Mypost.module.css"

export const MyPosts = (props) => {
let addPost=()=>{
    alert("Hello React")
}
    let postsElements=props.posts.map((p,i)=> {
      return  <Post key={i} message={p.message} likesCount={p.likesCount}/>

    })
    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <div>
                <div><textarea></textarea></div>
                <div>
                    <button onClick={addPost}>Add</button>
                </div>
            </div>
            {postsElements}
        </div>
    )
}