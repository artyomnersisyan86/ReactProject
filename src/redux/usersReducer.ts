import {followApi, usersApi} from "../api/api";
import {updateObjectInArray} from "../components/common/utils/objectHelpers";
import {UserType} from "../types/types";
import {AppStateType, InferActionsType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

// const FOLLOW = "project/usersPage/FOLLOW";
// const UNFOLLOW = "project/usersPage/UNFOLLOW";
// const SET_USERS = "project/usersPage/SET_USERS";
// const SET_CURENT_PAGE = "project/usersPage/SET_CURENT_PAGE";
// const SET_TOTAL_USER_COUNT = "project/usersPage/SET_TOTAL_USER_COUNT";
// const TOGGLE_IS_FETCHING = "project/usersPage/TOGGLE_IS_FETCHING";
// const TOGGLE_FOLLOWING_PROGRESS = "project/usersPage/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: [] as Array<number>,
};
type initialStateType = typeof initialState
const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case "SET_USERS": {
            return {...state, users: action.users}
        }
        case "SET_CURENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_TOTAL_USER_COUNT": {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_FOLLOWING_PROGRESS": {
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
type ActionsTypes = InferActionsType<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollowSuccess: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsers: (users: Array<UserType>) => ({type: "SET_USERS", users} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURENT_PAGE", currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: "SET_TOTAL_USER_COUNT", totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "TOGGLE_FOLLOWING_PROGRESS",
        isFetching,
        userId
    } as const),


}

// type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
// <void, RootState, unknown, Action<string>>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {

        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await usersApi.getUsers(page, pageSize);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                  actionCreator: (userId: number) =>
                                      ActionsTypes) => {

    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followApi.sendFollow.bind(followApi), actions.followSuccess);
    };
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, followApi.sendUnFollow.bind(followApi), actions.unfollowSuccess);

    }
}

export default usersReducer;