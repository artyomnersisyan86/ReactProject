let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hello React", likesCount: "0"},
                {id: 2, message: "How are you", likesCount: "23"},
            ],
            newPostText: "Hello React"
        },
        dialogsPage: {
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
        }
    },
    _callScriber() {
        console.log("Change State")
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callScriber = observer
    },

    // addPost() {
    //     let newPost = {
    //         id: 5,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     };
    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._callScriber(this._state)
    // },
    // updateNewPostText(newPostText) {
    //     this._state.profilePage.newPostText = newPostText;
    //     this._callScriber(this._state);
    // },

    // updateNewMessage(newMessageText) {
    //     this._state.dialogsPage.addNewMessage = newMessageText;
    //     this._callScriber(this._state);
    // },

    // addNewMessageFunc() {
    //     let newMessage = {
    //         id: 4,
    //         message: this._state.dialogsPage.addNewMessage
    //     };
    //     this._state.dialogsPage.messages.push(newMessage);
    //     this._state.dialogsPage.addNewMessage = '';
    //     this._callScriber(this._state);
    // },

    dispatch(action) {
        if (action.type === "ADD-POST") {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callScriber(this._state)
        } else if (action.type === "UPDATE-NEW-POST-TEX") {
            this._state.profilePage.newPostText = action.newPostText;
            this._callScriber(this._state);
        } else if (action.type === "ADD-NEW-MESSAGE-FUNC") {
            let newMessage = {
                id: 4,
                message: this._state.dialogsPage.addNewMessage
            };
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.addNewMessage = '';
            this._callScriber(this._state);
        } else if (action.type === "UPDATE-NEW-MESSAGE") {
            this._state.dialogsPage.addNewMessage = action.newMessageText;
            this._callScriber(this._state);
        }
    }
}
window.store = store;
export default store;