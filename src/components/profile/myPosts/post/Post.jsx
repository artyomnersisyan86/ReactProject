import React from "react"
import s from "./Post.module.css";

export const Post = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqisPvIQMX-I9nFF4I6CRQk17tag_lpk14iw&usqp=CAU"
                alt="avatar"/>
            {props.message}
            <div>
                <span>like {props.likesCount}</span>
            </div>
        </div>
    )
}