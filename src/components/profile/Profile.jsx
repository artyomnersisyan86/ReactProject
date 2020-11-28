import React from "react"
// import s from "./Profile.module.css"
// import {MyPosts} from "./myPosts/MyPosts";
// import { Redirect } from 'react-router-dom'
import { ProfileInfo } from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;