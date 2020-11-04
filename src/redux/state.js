let rerenderEntireTree = () => {
    console.log("Change State")
}

let state = {
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


}
export const addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state)
}
export const updateNewPostText = (newPostText) => {
    state.profilePage.newPostText = newPostText;
    rerenderEntireTree(state);
};

export const updateNewMessage = (newMessageText) => {
    state.dialogsPage.addNewMessage = newMessageText;
    rerenderEntireTree(state);
}
export const addNewMessageFunc = () => {
    let newMessage = {
        id: 4,
        message: state.dialogsPage.addNewMessagererenderEntireTree
    };
    state.dialogsPage.messages.push(newMessage);
    state.dialogsPage.addNewMessage = '';
    rerenderEntireTree(state);
}
window.state = state;

export let subscribe=(observer)=>{
    rerenderEntireTree=observer
}
export default state;