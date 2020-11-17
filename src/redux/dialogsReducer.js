const ADD_NEW_MESSAGE_FUNC = "ADD-NEW-MESSAGE-FUNC";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";
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
    addNewMessage: "hello New Message",
};

const
    dialogsReducer = (state = initialState, action) => {
        switch (action.type) {
            case ADD_NEW_MESSAGE_FUNC: {
                let newMessage = {
                    id: 4,
                    message: state.addNewMessage
                };
              return {
                    ...state,
                    addNewMessage: '',
                    messages: [...state.messages, newMessage]
                };
            }
            case UPDATE_NEW_MESSAGE: {
                return  {
                    ...state,
                    addNewMessage: action.newMessageText
                };
            }
            default :
                return state
        }
    };

export const addNewMessageFuncCreator = () => {
    return {
        type: ADD_NEW_MESSAGE_FUNC
    }
}
export const updateNewMessageCreator = (newText) => {
    return {
        type: UPDATE_NEW_MESSAGE,
        newMessageText: newText
    }
}
export default dialogsReducer;