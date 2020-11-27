import React from "react"
import {connect} from "react-redux"
import {
    follow, getUsers,
    setCurrentPage,
    // setTotalUsersCount,
    // setUsers,
    // toggleIsFetching,
    toggleFollowingProgress,
    unfollow
} from "../../redux/usersReducer";
// import UsersAPIComponent from "./UsersAPIComponent";
import Users from "./Users";
// import * as axios from "axios"
import Preloader from "../common/preloader/Preloader";

// import {usersApi} from "../../api/api";


class UsersContainer extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetching(true);
        // usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     console.log(data);
        //     console.log("start");
        //     this.props.setUsers(data.items);
        //     this.props.toggleIsFetching(false);
        //     this.props.setTotalUsersCount(data.totalCount);
        // })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress,
    }
}
export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    // setUsers,
    // setTotalUsersCount,
    // toggleIsFetching,
    toggleFollowingProgress,
    getUsers
})(UsersContainer);
