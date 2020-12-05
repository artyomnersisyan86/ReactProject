import React from "react"
import Paginator from "../common/paginator/Paginator";
import User from "./User";

let Users = ({onPageChanged, currentPage, totalUsersCount, pageSize, users, ...props}) => {
    return (
        <div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage}
                       totalUsersCount={totalUsersCount} pageSize={pageSize}/>
            <div>
                {users.map(u =>
                    <User key={u.id} user={u}
                          follow={props.follow}
                          unfollow={props.unfollow}
                          followingProgress={props.followingProgress}/>
                )}
            </div>
        </div>
    )
}
export default Users;