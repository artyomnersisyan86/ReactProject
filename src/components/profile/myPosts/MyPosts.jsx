import React from "react";
import {Post} from "./post/Post";
export const MyPosts = (props) => {
    return (
        <div>
          <Post message="Hello React" likesCount="0"/>
          <Post message="How are you" likesCount="23"/>
        </div>
    )
}