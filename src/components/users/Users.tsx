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
import {useHistory} from "react-router";

type PropsType = {
    portionSize?: number
}
let Users: FC<PropsType> = () => {
    const totalUsersCount = useSelector(getTotalUsersCount)

    const currentPage = useSelector(getCurrentPage)

    const pageSize = useSelector(getUsersPageSize)
    const filter = useSelector(getUserFilterSelector)
    const users = useSelector(getUsers)
    const followingProgress = useSelector(getFollowingProgress)

    const history = useHistory()

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
    useEffect(() => {
        history.push({
            pathname: "/users",
            search: `?term=${filter.term}&friend=${filter.friend}&currentPage=${currentPage}`,
        })
    }, [filter,currentPage,history])
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [currentPage, pageSize, filter,dispatch])

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