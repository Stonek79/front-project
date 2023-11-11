import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstarage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlags } from '@/shared/lib/features'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/jsonSettings'
import { initAuthData } from '../services/initAuthData'

const initialState: UserSchema = {
    inited: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload
            setFeatureFlags(payload.features)
            localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id)
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, action: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = action.payload
                }
            },
        )
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload
                setFeatureFlags(payload.features)
                state.inited = true
            },
        )
        builder.addCase(initAuthData.rejected, (state) => {
            state.inited = true
        })
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
