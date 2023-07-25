import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from '@/entities/Profile'
import { ProfileSchema } from '../../model/types/profilePageEditSchema'
import { updateProfileData } from '../services/UpdateProfileData'
import { fetchProfileData } from '../services/FetchProfileData'
import { createProfile } from '../services/CreateProfile'

const initialState: ProfileSchema = {
    data: undefined,
    form: undefined,
    error: undefined,
    validateErrors: undefined,
    isLoading: false,
    readonly: true,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.validateErrors = undefined
            state.form = state.data
        },
        resetError: (state, action: PayloadAction<string>) => {
            if (state.validateErrors)
                state.validateErrors = {
                    ...state.validateErrors,
                    [action.payload]: [],
                }
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                },
            )
            .addCase(fetchProfileData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.error = payload
            })
            .addCase(updateProfileData.pending, (state) => {
                state.validateErrors = undefined
                state.isLoading = true
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                    state.readonly = true
                    state.validateErrors = undefined
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.validateErrors = action.payload
            })
            .addCase(createProfile.pending, (state) => {
                state.validateErrors = undefined
                state.isLoading = true
            })
            .addCase(
                createProfile.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                    state.readonly = false
                    state.validateErrors = undefined
                },
            )
            .addCase(createProfile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
