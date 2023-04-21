import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Profile, ValidateErrors } from 'entities/Profile'
import { ValidateProfileData } from './ValidateProfileData'

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<ValidateErrors>
>(
    'profile/fetchProfileData',
    async (profileId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const { data } = await extra.api.get<Profile>(`/profile/${profileId}`)

            if (!data) {
                return rejectWithValue(ValidateProfileData(data))
            }

            return data
        } catch (e: any | unknown) {
            return rejectWithValue(e.message)
        }
    },
)
