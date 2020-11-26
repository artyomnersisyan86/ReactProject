import React from "react"
import {connect} from "react-redux"
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../redux/usersReducer";
// import UsersAPIComponent from "./UsersAPIComponent";
import Users from "./Users";
// import * as axios from "axios"
import Preloader from "../common/preloader/Preloader";
import {usersApi} from "../../api/api";


class UsersContainer extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            console.log(data);
            console.log("start");
            this.props.setUsers(data.items);
            this.props.toggleIsFetching(false);
            this.props.setTotalUsersCount(data.totalCount);
        })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            console.log(data);
            console.log("start");
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items)
        })
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
                   unfollow={this.props.unfollow}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}
export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer);
