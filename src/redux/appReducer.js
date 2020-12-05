import { getAuthUserData } from "./authReducer";


const INITIALIZED_SUCCESS = "project/app/INITIALIZED_SUCCESS";
let initialState = {
    initialized: false
};
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
};
const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})


export const initializedApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
   Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })

}
export default appReducer;