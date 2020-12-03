import React from "react"
// import s from "./ProfilInfo.module.css"
import Preloader from "../../common/preloader/Preloader";
import s from "./ProfilInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <h3>fullName: {props.profile.fullName}</h3>
                <img src={props.profile.photos.large} alt={"photos"}/>
                <p>lookingForAJobDescription: {props.profile.lookingForAJobDescription}</p>
                <p>aboutMe: <strong>{props.profile.aboutMe}</strong></p>
                <hr/>
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )


}