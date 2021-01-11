import {getAuthUserData} from "./authReducer";


const INITIALIZED_SUCCESS = "project/app/INITIALIZED_SUCCESS";
export type initialStateType = {
    initialized: Boolean
}
let initialState: initialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state
    }
};

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS})


export const initializedApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })

}
export default appReducer;