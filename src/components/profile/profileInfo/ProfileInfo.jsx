import React, { useState } from "react"
import Preloader from "../../common/preloader/Preloader";
import s from "./ProfilInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhotos from "../../../assets/images/user.png";
import ProfileFormDataReduxForm from "./ProfileFormData";

export const ProfileInfo = ({profile, status, updateUserStatus, savePhoto, isOwner, saveProfile}) => {
    let [editMode, setEditMode] = useState(false)
    if (!profile) {
        return <Preloader/>
    }
    const onChangePhoto = (event) => {
        if (event.target.files.length) {
            savePhoto(event.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }).catch((e) => {
            console.log(e)
        });
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhotos} className={s.profilePhoto} alt={"photos"}/>
                {isOwner && <div><input type={"file"} onChange={onChangePhoto}/></div>}
                <div>
                    {/*initialValue ReduxForm*/}
                    {editMode ?
                        <ProfileFormDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                        : <ProfileData profile={profile}
                                       goToEditMode={() => {
                                           setEditMode(true)
                                       }}
                                       isOwner={isOwner}/>}
                </div>

                <hr/>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}


const ProfileData = ({profile, goToEditMode, isOwner}) => {
    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>edit</button>}
            <h3>fullName: {profile.fullName}</h3>

            <div><b>looking for A job</b>: {profile.lookingForAJob ? "yes" : "No"}</div>

            {profile.lookingForAJob &&
            <div><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>}

            <div><b>AboutMe</b>: <strong>{profile.aboutMe}</strong></div>

            <div><b>Contacts</b>: <strong>{Object.keys(profile.contacts).map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}</strong></div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>- <b>{contactTitle}</b>:{contactValue} </div>
}