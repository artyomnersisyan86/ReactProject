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
    }
};
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
    }
}