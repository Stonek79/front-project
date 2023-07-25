import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { newProfile, addProfileMutation, Profile } from '@/entities/Profile'
import { User } from '@/entities/User'

export const createProfile = createAsyncThunk<
    Profile,
    User,
    ThunkConfig<string>
>('profile/createProfile', async (user, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    const { username, id } = user
    const data = { ...newProfile, username, userId: id }

    try {
        const res = await dispatch(addProfileMutation(data)).unwrap()

        if (!res) {
            return rejectWithValue('serverError')
        }

        return res
    } catch (e: any | unknown) {
        return rejectWithValue(e.message)
    }
})
