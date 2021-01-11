export type PostType = {
    id: number,
    message: string,
    likesCount: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType,
    photos: PhotoType,

}
export type PhotoType = {
    small: string,
    large: string
}

export type UserType = {
    id: number,
    name: string
    status: string
    photos:PhotoType
}