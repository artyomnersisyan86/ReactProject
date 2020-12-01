const ADD_NEW_MESSAGE_FUNC = "ADD-NEW-MESSAGE-FUNC";
let initialState = {
    dialogds: [
        {id: 1, name: "Armen"},
        {id: 2, name: "Artyom"},
        {id: 3, name: "Armine"},
        {id: 4, name: "Hovo"},
        {id: 5, name: "Armencho"},
        {id: 6, name: "Valodik"},
    ],
    messages: [
        {id: 1, message: "Hello"},
        {id: 2, message: "How are you"},
        {id: 3, message: "I`m fine, thank you"},
    ],
};

const
    dialogsReducer = (state = initialState, action) => {
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

export const addNewMessageFuncCreator = (addNewMessage) => {
    return {
        type: ADD_NEW_MESSAGE_FUNC,
        addNewMessage
    }
}
export default dialogsReducer;