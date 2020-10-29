import React from "react"
import s from "./Profile.module.css"
import {MyPosts} from "./myPosts/MyPosts";

const Profile = () => {
    return (
        <div >
            <div>
                <img alt='img' className={s.imgContent}
                     src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIEFSgR4KalDe02P14U5J5kOxtFuY7qUQ7BQ&usqp=CAU'/>
            </div>
            <div>
                avatar + description
            </div>
            <MyPosts/>
        </div>
    )
}
export default Profile;