import React from "react"
import s from "./Users.module.css";
import userPhotos from "../../assets/images/user.png";
import { NavLink } from "react-router-dom"


let User = ({user, followingProgress, follow, unfollow}) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhotos} alt="avatar"
                                         className={s.userPhoto}/>
                                           </NavLink>
            </div>
                <div>{user.followed ? <button disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}>unfollow</button>
                    : <button disabled={followingProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>follow</button>}
                </div>
                </span>
            <span><div> {user.name}</div><div>{user.status}</div><div>ID: {user.id}</div></span>
            <span><div>{"user.location.country"}</div><div>{"user.location.city"}</div></span>
        </div>
    )
}
export default User;