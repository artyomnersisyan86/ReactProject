import * as axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "1b19c59f-bdd0-4500-bd30-3ebbdde0e3cd"
    }
})

export const usersApi = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage} & count =${pageSize}`,
        ).then(response => {
            return response.data
        })
    },

};
export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(response => {
            return response.data
        })
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
//follow
// axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id} `, {},
//     {
//         withCredentials: true,
//         headers: {
//             "API-KEY": "1b19c59f-bdd0-4500-bd30-3ebbdde0e3cd"
//         }
//     })
//unFollow
// axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id} `,
//     {
//         withCredentials: true,
//         headers: {
//             "API-KEY": "1b19c59f-bdd0-4500-bd30-3ebbdde0e3cd"}})

// axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
export const followApi = {
    sendFollow(id) {
        return instance.post(`follow/${id}`,
        ).then(response => {
            return response.data
        })

    },
    sendUnFollow(id) {
        return instance.delete(`follow/${id}`,
        ).then(response => {
            return response.data
        })

    }
}
export const profileApi = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => {
            return response.data
        })
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },

    savePhotoApi(file) {
        let formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}