import React from "react"
import s from "./Users.module.css"
import * as axios from "axios"
import userPhotos from "../../assets/images/user.png"

class Users extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage} & count =${this.props.pageSize}`)
            .then(response => {
                console.log(response.data);
                console.log("start");
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }
onPageChanged=(pageNumber)=>{
    this.props.setCurrentPage(pageNumber);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber} & count =${this.props.pageSize}`)
        .then(response => {
            console.log(response.data);
            console.log("start");
            this.props.setUsers(response.data.items)
        })
}
    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return <div>
            <div className={s.paginationCursor}>

                {pages.map((p) => {
                    return <span key={p} onClick={()=>{this.onPageChanged(p)}}
                                 className={this.props.currentPage === p ? s.selectedPage : undefined}>{p}</span>
                })}
            </div>

            <div>{this.props.users.map(u => <div key={u.id}>
                            <span>
                                <div> <img src={u.photos.small != null ? u.photos.small : userPhotos} alt="avatar"
                                           className={s.userPhoto}/></div>

                                <div>{u.followed ? <button onClick={() => {
                                        this.props.unfollow(u.id)
                                    }}>unfollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(u.id)
                                    }}>follow</button>}
                                </div>
                            </span>
                <span><div> {u.name}</div><div>{u.status}</div><div>ID: {u.id}</div></span>
                <span><div>{"u.location.country"}</div><div>{"u.location.city"}</div></span>

            </div>)}</div>
        </div>

    }
}


export default Users;