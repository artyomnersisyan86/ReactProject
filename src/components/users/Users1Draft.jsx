import React from "react"
import s from "./Users.module.css"
import * as axios from "axios"
import userPhotos from "../../assets/images/user.png"

let Users1Draft = (props) => {
    let getUser=()=>{
        if (props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                console.log(response.data);
                console.log("start");
                props.setUsers(response.data.items)
            })
        }
    }

    return <div>
        <button onClick={getUser}>getUser</button>
        {
            props.users.map(u => <div key={u.id}>
                            <span>
                                <div> <img src={u.photos.small != null ? u.photos.small : userPhotos} alt="avatar"
                                           className={s.userPhoto}/></div>
                                <div>
                                    {u.followed ?
                                        <button onClick={() => {
                                            props.unfollow(u.id)
                                        }}>unfollow</button>
                                        : <button onClick={() => {
                                            props.follow(u.id)
                                        }}>follow</button>
                                    }
                                </div>
                            </span>
                    <span><div> {u.name}</div><div>{u.status}</div><div>ID: {u.id}</div></span>
                    <span><div>{"u.location.country"}</div><div>{"u.location.city"}</div></span>

                </div>
            )}
    </div>

};
export default Users1Draft;