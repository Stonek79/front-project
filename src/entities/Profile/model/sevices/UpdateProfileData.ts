import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Profile } from '../../model/types/profile'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI

        const formData = getProfileForm(getState())

        try {
            const { data } = await extra.api.put<Profile>('/profile', formData)

            if (!data) {
                throw Error('server error')
            }

            return data
        } catch (e: any | unknown) {
            return rejectWithValue(e.message)
        }
    },
)
