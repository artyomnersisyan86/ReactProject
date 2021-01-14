import React, {FC, useEffect} from "react"
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UserSearchForm";
import {FilterSearchType, requestUsers, follow, unfollow} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFollowingProgress,
    getTotalUsersCount,
    getUserFilterSelector,
    getUsers,
    getUsersPageSize
} from "../../redux/userSelectors";

type PropsType = {
    // totalUsersCount: number
    // pageSize: number
    // currentPage: number
    // onPageChanged: (pageNumber: number) => void,
    portionSize?: number
    // users: Array<UserType>
    // followingProgress: Array<number>
    // follow: (id: number) => void,
    // unfollow: (id: number) => void,
    // onFilterChanged: (filter: FilterSearchType) => void


}
let Users: FC<PropsType> = ({
                                // onPageChanged,
                                // users,

                                // currentPage,
                                // totalUsersCount,
                                // pageSize,
                                ...props
                            }) => {
    const totalUsersCount = useSelector(getTotalUsersCount)

    const currentPage = useSelector(getCurrentPage)

    const pageSize = useSelector(getUsersPageSize)
    const filter = useSelector(getUserFilterSelector)
    const users = useSelector(getUsers)
    const followingProgress = useSelector(getFollowingProgress)

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])
    const dispatch = useDispatch()

    const follow1 = (id: number) => {
        dispatch(follow(id))
    }

    const unfollow2 = (id: number) => {
        dispatch(unfollow(id))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterSearchType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }


    return (
        <div>
            <div><UserSearchForm onFilterChanged={onFilterChanged}/></div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            <div>
                {users.map(u =>
                    <User key={u.id} user={u}
                          follow={follow1}
                          unfollow={unfollow2}
                          followingProgress={followingProgress}/>
                )}
            </div>
        </div>
    )
}

export default Users;