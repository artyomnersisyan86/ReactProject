import { followApi, usersApi } from "../api/api";
import { updateObjectInArray } from "../components/common/utils/objectHelpers";

const FOLLOW = "project/usersPage/FOLLOW";
const UNFOLLOW = "project/usersPage/UNFOLLOW";
const SET_USERS = "project/usersPage/SET_USERS";
const SET_CURENT_PAGE = "project/usersPage/SET_CURENT_PAGE";
const SET_TOTAL_USER_COUNT = "project/usersPage/SET_TOTAL_USER_COUNT";
const TOGGLE_IS_FETCHING = "project/usersPage/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "project/usersPage/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [],
};
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            // if(action.isFetching){
            //  return   this.followingProgress= [ ...state.followingProgress,action.userId]
            // }else{
            //    return  state.followingProgress.filter(id=>id!=action.userId)
            // }
            return {
                ...state,
                followingProgress: action.isFetching ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
};
const followSuccess = (userId) => ({type: FOLLOW, userId})
const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURENT_PAGE, currentPage})
const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USER_COUNT, totalUsersCount})
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersApi.getUsers(page, pageSize);
        dispatch(setUsers(data.items));
        dispatch(toggleIsFetching(false));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followApi.sendFollow.bind(followApi), followSuccess);
    };
}
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followApi.sendUnFollow.bind(followApi), unfollowSuccess);

    }
}

export default usersReducer;