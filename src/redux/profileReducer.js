import { profileApi } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = "project/profilePage/ADD-POST";
const SET_USER_PROFILE = "project/profilePage/SET_USER_PROFILE";
const SET_STATUS = "project/profilePage/SET_STATUS";
const SET_PHOTO_ACCESS = "project/profilePage/SET_PHOTO_ACCESS";
let initialState = {
    posts: [
        {id: 1, message: "Hello React", likesCount: "0"},
        {id: 2, message: "How are you", likesCount: "23"},
    ],
    profile: null,
    status: ""
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }

        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_PHOTO_ACCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        }
        default:
            return state
    }
};

export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}

const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setStatus = (status) => ({type: SET_STATUS, status})
const savePhotoAccess = (photos) => ({type: SET_PHOTO_ACCESS, photos})

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        try {
            let data = await profileApi.getProfile(userId);
            dispatch(setUserProfile(data));
        }catch (e){
            console.log(getUserProfile,e)
        }
    }
}
export const getUserStatus = (userId) => {
    return async (dispatch) => {
        try {
              let response = await profileApi.getStatus(userId);
        dispatch(setStatus(response.data));
        }catch (e){
            console.log("getUserStatus", e)
        }

    }
}
export const updateUserStatus = (staus) => {
    return async (dispatch) => {
        try {
            let response = await profileApi.updateStatus(staus);
            if (response.data.resultCode === 0) {
                dispatch(setStatus(staus));
            }
        } catch (error){
            console.log(error)
        }
    }
}
export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileApi.savePhotoApi(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoAccess(response.data.data.photos));
        }
    }
}

export const saveProfile = (profile,) => {

    return async (dispatch, getState) => {
        let userId = getState().auth.id
        console.log(userId)
        let response = await profileApi.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        }else{
             dispatch(stopSubmit("editProfile", {_error:response.data.messages[0]}));
             return Promise.reject(response.data.messages)
        }
    }
}

export default profileReducer;