import {followApi, usersApi} from "../api/api";
import {updateObjectInArray} from "../components/common/utils/objectHelpers";
import {UserType} from "../types/types";

const FOLLOW = "project/usersPage/FOLLOW";
const UNFOLLOW = "project/usersPage/UNFOLLOW";
const SET_USERS = "project/usersPage/SET_USERS";
const SET_CURENT_PAGE = "project/usersPage/SET_CURENT_PAGE";
const SET_TOTAL_USER_COUNT = "project/usersPage/SET_TOTAL_USER_COUNT";
const TOGGLE_IS_FETCHING = "project/usersPage/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "project/usersPage/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<number>,
};
type initialStateType = typeof initialState
const usersReducer = (state = initialState, action: any): initialStateType => {
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
type followSuccessType = {
    type: typeof FOLLOW,
    userId: number
}

const followSuccess = (userId: number): followSuccessType => ({type: FOLLOW, userId})
type UnFollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
const unfollowSuccess = (userId: number): UnFollowSuccessType => ({type: UNFOLLOW, userId})
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users})

type SetCurrentPageType = {
    type: typeof SET_CURENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURENT_PAGE, currentPage})
type SetTotalUsersCount = {
    type: typeof SET_TOTAL_USER_COUNT,
    totalUsersCount: number
}

const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCount => ({
    type: SET_TOTAL_USER_COUNT,
    totalUsersCount
})
type ToggleIsFetching = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingProgress = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgress => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await usersApi.getUsers(page, pageSize);
        dispatch(setUsers(data.items));
        dispatch(toggleIsFetching(false));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {

    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}
export const follow = (userId: any) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, followApi.sendFollow.bind(followApi), followSuccess);
    };
}
export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, followApi.sendUnFollow.bind(followApi), unfollowSuccess);

    }
}

export default usersReducer;