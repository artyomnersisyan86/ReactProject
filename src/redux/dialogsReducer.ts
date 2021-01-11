const ADD_NEW_MESSAGE_FUNC = "project/dialogsPage/ADD-NEW-MESSAGE-FUNC";
type Dialog = {
    id: number,
    name: string
}
type Message = {
    id: number,
    message: string
}

let initialState = {
    dialogds: [
        {id: 1, name: "Armen"},
        {id: 2, name: "Artyom"},
        {id: 3, name: "Armine"},
        {id: 4, name: "Hovo"},
        {id: 5, name: "Armencho"},
        {id: 6, name: "Valodik"},
    ] as Array<Dialog>,
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "How are you"},
        {id: 3, message: "I`m fine, thank you"},
    ] as Array<Message>,
};

type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_NEW_MESSAGE_FUNC: {
            let newMessage = {
                id: 4,
                message: action.addNewMessage
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        default :
            return state
    }
};

type addNewMessageFuncCreatorType = {
    type: typeof ADD_NEW_MESSAGE_FUNC,
    addNewMessage: string

}

export const addNewMessageFuncCreator = (addNewMessage: string): addNewMessageFuncCreatorType => {
    return {
        type: ADD_NEW_MESSAGE_FUNC,
        addNewMessage
    }
}
export default dialogsReducer;