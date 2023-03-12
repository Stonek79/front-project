import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Profile } from 'entities/Profile'

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const { data } = await extra.api.get<Profile>('/profile')

            if (!data) {
                throw Error('server error')
            }

            return data
        } catch (e: any | unknown) {
            return rejectWithValue(e.message)
        }
    },
)
