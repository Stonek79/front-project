export interface SignUpSchema {
    username: string
    password: string
    confirmedPassword: string
    isLoading: boolean
    error?: string
}
