const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEX = "UPDATE-NEW-POST-TEX";
const SET_USER_PROFILE = "SET_USER_PROFILE";
let initialState = {
    posts: [
        {id: 1, message: "Hello React", likesCount: "0"},
        {id: 2, message: "How are you", likesCount: "23"},
    ],
    newPostText: "Hello React",
    profile:null
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        }
        case UPDATE_NEW_POST_TEX: {
            return {
                ...state,
                newPostText: action.newPostText
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

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEX,
        newPostText: text
    }
}
    export const setUserProfile = (profile) =>( {type: SET_USER_PROFILE, profile})
export default profileReducer;