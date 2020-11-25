import React from "react"
import s from "./Users.module.css";
import userPhotos from "../../assets/images/user.png";
import {NavLink} from "react-router-dom"

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div className={s.paginationCursor}>
                ------
                {pages.map(p => {
                    return <span key={p} onClick={(e) => {
                        props.onPageChanged(p)
                    }}
                                 className={props.currentPage === p ? s.selectedPage : undefined}>{p}</span>
                })}
            </div>

            <div>{props.users.map(u =>  <div key={u.id}>
                            <span>
                                <div> <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhotos} alt="avatar"
                                         className={s.userPhoto}/>
                                           </NavLink>
            </div>

                <div>{u.followed ? <button onClick={() => {
                        props.unfollow(u.id)
                    }}>unfollow</button>
                    : <button onClick={() => {
                        props.follow(u.id)
                    }}>follow</button>}
                </div>
                </span>
                <span><div> {u.name}</div><div>{u.status}</div><div>ID: {u.id}</div></span>
                <span><div>{"u.location.country"}</div><div>{"u.location.city"}</div></span>

                </div>)}</div>
        </div>
    )
}
export default Users;