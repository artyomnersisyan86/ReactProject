import React, {FC} from "react"
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import UserSearchForm from "./UserSearchForm";
import {FilterSearchType} from "../../redux/usersReducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void,
    currentPage: number
    portionSize?: number
    users: Array<UserType>
    followingProgress: Array<number>
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    onFilterChanged:(filter:FilterSearchType)=>void


}
let Users: FC<PropsType> = ({onPageChanged,
                                currentPage, totalUsersCount, pageSize, users, ...props}) => {
    return (
        <div>
            <div><UserSearchForm onFilterChanged={props.onFilterChanged}/></div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
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