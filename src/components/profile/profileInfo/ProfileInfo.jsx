import React from "react"
// import s from "./ProfilInfo.module.css"
import Preloader from "../../common/preloader/Preloader";
import s from "./ProfilInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhotos from "../../../assets/images/user.png";

export const ProfileInfo = ({profile, status, updateUserStatus, savePhoto, isOwner}) => {
    if (!profile) {
        return <Preloader/>
    }
    const onChangePhoto = (event) => {
        if (event.target.files.length) {
            savePhoto(event.target.files[0])
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhotos} className={s.profilePhoto} alt={"photos"}/>
                {isOwner && <div><input type={"file"} onChange={onChangePhoto}/></div>}
                <h3>fullName: {profile.fullName}</h3>
                <p>lookingForAJobDescription: {profile.lookingForAJobDescription}</p>
                <p>aboutMe: <strong>{profile.aboutMe}</strong></p>
                <hr/>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )


}