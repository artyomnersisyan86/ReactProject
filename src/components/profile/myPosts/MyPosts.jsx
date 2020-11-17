import React from "react";
import {Post} from "./post/Post";
import s from "./Mypost.module.css"
// import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";


export const MyPosts = (props) => {
    let postsElements = props.posts.map((p, i) => {
        return <Post key={i} message={p.message} likesCount={p.likesCount}/>
    })
    let newPostElement = React.createRef();
    let onAddPost = () => {
        props.addPost();
        // props.dispatch(addPostActionCreator());
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        // let action = updateNewPostTextActionCreator(text);
        // props.dispatch(action);
        props.updateNewPostText(text);
    }
    return (
        <div className={s.postsBlock}>
            <h2>My post</h2>
            <div>
                <div><textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/></div>
                <div>
                    <button onClick={onAddPost}>Add</button>
                </div>
            </div>
            {postsElements}
        </div>
    )
}



