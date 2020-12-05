import React from "react"
import { connect } from "react-redux"
import { follow, requestUsers, toggleFollowingProgress, unfollow } from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { compose } from "redux"
import {
    getCurrentPage, getFollowingProgress,
    getIsFetching,
    getTotalUsersCount, getUsers,
    getUsersPageSize,

} from "../../redux/userSelectors";

// import { withRouter } from "react-router-dom";
class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
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

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {follow, unfollow, toggleFollowingProgress, getUsers: requestUsers})
)(UsersContainer)
