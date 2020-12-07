import React from "react"
import Profile from "./Profile";
import { connect } from "react-redux"
import { getUserProfile, getUserStatus, savePhoto, updateUserStatus } from "../../redux/profileReducer";
import { withRouter } from "react-router-dom";
// import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux"

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            {...this.props}
            profile={this.props.profile}
            status={this.props.status || "-----"}
            updateUserStatus={this.props.updateUserStatus}
        />
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,

})

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus,savePhoto}),
    // withAuthRedirect,
    withRouter
)(ProfileContainer)
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)