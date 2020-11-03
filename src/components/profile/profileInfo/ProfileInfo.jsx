import React from "react"
import s from "./ProfilInfo.module.css"
export const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img alt='img' className={s.imgContent}
                     src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIEFSgR4KalDe02P14U5J5kOxtFuY7qUQ7BQ&usqp=CAU'/>
            </div>
            <div className={s.descriptionBlock}>
                avatar + description
            </div>
        </div>
    )
}