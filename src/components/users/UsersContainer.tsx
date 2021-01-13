import React from "react"
import {connect} from "react-redux"
import {follow, requestUsers,  unfollow} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux"
import {
    getCurrentPage, getFollowingProgress,
    getIsFetching,
    getTotalUsersCount, getUsers,
    getUsersPageSize,

} from "../../redux/userSelectors";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../types/types";

// import { withRouter } from "react-router-dom";
type OwnPropsType = {
    pageTitle: string
}
type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingProgress: Array<number>
}
type MapDispatchToPropsType = {
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void
}
type PropsType = MapStateToPropsType &  MapDispatchToPropsType & OwnPropsType
// type PropsType = {
//     // currentPage: number
//     // pageSize: number
//     // isFetching: boolean
//     // totalUsersCount: number
//     // users: Array<UserType>
//     // followingProgress: Array<number>
//     // follow: (id: number) => void,
//     // unfollow: (id: number) => void,
//     // getUsers: (currentPage: number, pageSize: number) => void
// }

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                // toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingProgress={this.props.followingProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getUsersPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state),
    }
}
export default compose(
    // withRouter,
    connect<MapStateToPropsType,MapDispatchToPropsType,OwnPropsType,AppStateType> (mapStateToProps, {
        follow,
        unfollow,
        // toggleFollowingProgress,
        getUsers: requestUsers
    })
)(UsersContainer)
