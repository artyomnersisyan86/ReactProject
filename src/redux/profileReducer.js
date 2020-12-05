import { profileApi } from "../api/api";

const ADD_POST = "project/profilePage/ADD-POST";
const SET_USER_PROFILE = "project/profilePage/SET_USER_PROFILE";
const SET_STATUS = "project/profilePage/SET_STATUS";
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

export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let data = await profileApi.getProfile(userId);
        dispatch(setUserProfile(data));
    }
}
export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileApi.getStatus(userId);
        dispatch(setStatus(response.data));
    }
}
export const updateUserStatus = (staus) => {
    return async (dispatch) => {
        let response = await profileApi.updateStatus(staus);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(staus));
        }
    }
}

export default profileReducer;