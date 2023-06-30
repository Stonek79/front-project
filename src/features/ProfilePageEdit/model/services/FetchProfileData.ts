import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'

export const fetchProfileData = createAsyncThunk<
    Profile[],
    string,
    ThunkConfig<string>
>('profile/fetchProfileData', async (userId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const { data } = await extra.api.get<Profile[]>(`/profile/`, {
            params: {
                userId,
                _expand: 'user',
            },
        })
        console.log(data, 'fetc')
        if (!data) {
            return rejectWithValue('serverError')
        }

        return data
    } catch (e: any | unknown) {
        if (e.status === 404) {
            console.log(e)
            return rejectWithValue(e.status)
        }
        return rejectWithValue(e.message)
    }
})
