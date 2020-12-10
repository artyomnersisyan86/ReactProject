import React from "react"
// import s from "./Profile.module.css"
// import {MyPosts} from "./myPosts/MyPosts";
// import { Redirect } from 'react-router-dom'
import { ProfileInfo } from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile;