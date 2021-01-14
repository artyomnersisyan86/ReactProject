import axios from "axios"
import {ProfileType} from "../types/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "1b19c59f-bdd0-4500-bd30-3ebbdde0e3cd"
    }
})

export const usersApi = {
    getUsers(currentPage: number, pageSize: number, term: string = "", friend: undefined | boolean = undefined) {
        return instance.get(`users?page=${currentPage} & count =${pageSize}&term=${term}&friend=${friend}`,
        ).then(response => {
            return response.data
        })
    },

};

type MeResponseType = {
    data: {
        id: number,
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number,
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => {
            return response.data
        })
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(response => {
            return response.data
        })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const captchaAPI = {
    captcha() {
        return instance.get(`security/get-captcha-url`)
    },
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
    sendFollow(id: number) {
        return instance.post(`follow/${id}`,
        ).then(response => {
            return response.data
        })

    },
    sendUnFollow(id: number) {
        return instance.delete(`follow/${id}`,
        ).then(response => {
            return response.data
        })

    }
}
export const profileApi = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`).then(response => {
            return response.data
        })
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    },

    savePhotoApi(file: any) {
        let formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}