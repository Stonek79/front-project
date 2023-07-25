import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { newProfile, addProfileMutation, Profile } from '@/entities/Profile'
import { User } from '@/entities/User'

interface CreateProfileProps {
    user: User
    profileRoute?: (id: string) => void
}
export const createProfile = createAsyncThunk<
    Profile,
    CreateProfileProps,
    ThunkConfig<string>
>('profile/createProfile', async ({ user, profileRoute }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    const { username, id } = user
    const data = { ...newProfile, username, userId: id }

    try {
        const res = await dispatch(addProfileMutation(data)).unwrap()

        if (!res) {
            return rejectWithValue('serverError')
        }

        if (profileRoute) {
            profileRoute(id)
        }

        return res
    } catch (e: any | unknown) {
        return rejectWithValue(e.message)
    }
})
