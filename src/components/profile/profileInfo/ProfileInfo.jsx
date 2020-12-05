import React from "react"
// import s from "./ProfilInfo.module.css"
import Preloader from "../../common/preloader/Preloader";
import s from "./ProfilInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export const ProfileInfo = ({profile,status,updateUserStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <h3>fullName: {profile.fullName}</h3>
                <img src={profile.photos.large} alt={"photos"}/>
                <p>lookingForAJobDescription: {profile.lookingForAJobDescription}</p>
                <p>aboutMe: <strong>{profile.aboutMe}</strong></p>
                <hr/>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )


}