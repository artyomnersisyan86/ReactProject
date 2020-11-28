import React from "react"
import s from "./ProfilInfo.module.css"
import Preloader from "../../common/preloader/Preloader";
export const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img alt='img' className={s.imgContent}
                     src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIEFSgR4KalDe02P14U5J5kOxtFuY7qUQ7BQ&usqp=CAU'/>
            </div>
            <div className={s.descriptionBlock}>
                <h3>fullName:  {props.profile.fullName}</h3>
                <img src={props.profile.photos.large} alt={"photos"}/>
                <p>lookingForAJobDescription: {props.profile.lookingForAJobDescription}</p>
                <p>aboutMe: <strong>{props.profile.aboutMe}</strong> </p>
                avatar + description
            </div>
        </div>
    )
}