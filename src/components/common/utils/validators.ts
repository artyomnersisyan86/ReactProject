// export const required1 = value => (value || typeof value === 'number' ? undefined : 'Required')
// const maxLength = max => value =>
//     value && value.length > max ? `Must be ${max} characters or less` : undefined
// const maxLength15 = maxLength(15)

export type FieldValidatorsType = (value: string | undefined) => string | undefined

export const required: FieldValidatorsType = value => {
    if (value) {
        return undefined
    } else {
        return "Field is required"
    }
}
export const maxLengthCreator = (max: number): FieldValidatorsType => value => {
    if (value && value.length > max) {
        return `Must Be ${max} character or less`
    } else {

        return undefined
    }
}
