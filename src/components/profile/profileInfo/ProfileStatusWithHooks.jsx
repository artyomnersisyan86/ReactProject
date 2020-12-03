import React, { useState } from "react";

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setProfileStatus] = useState(props.status)

    const activatedEditMode = () => {
        setEditMode(true)
    }
    let deActivatedEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }
    const onStatusChange = (e) => {
        setProfileStatus(e.currentTarget.value)
    }
    return (

        <div>
            {!editMode &&
            <div><span onDoubleClick={activatedEditMode}><strong>{props.status}</strong> </span></div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} type="text"
                       onBlur={deActivatedEditMode} value={status}
                />
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks