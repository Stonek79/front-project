import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstarage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlags } from '@/shared/lib/features'

const initialState: UserSchema = {
    inited: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
            setFeatureFlags(action.payload.features)
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
            if (user) {
                const jsonUser = JSON.parse(user) as User
                state.authData = jsonUser
                setFeatureFlags(jsonUser.features)
            }
            state.inited = true
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        },
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
