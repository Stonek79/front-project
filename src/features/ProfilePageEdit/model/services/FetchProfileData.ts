import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
>('profile/fetchProfileData', async (userId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    console.log(userId, 'FETCH')
    try {
        const { data } = await extra.api.get<Profile[]>(`/profile/`, {
            params: {
                userId,
                _expand: 'user',
            },
        })

        if (!data) {
            return rejectWithValue('serverError')
        }

        console.log(data, 'PROFILE DATA')
        return data[0]
    } catch (e: any | unknown) {
        if (e.status === 404) {
            console.log(e)
            return rejectWithValue(e.status)
        }
        return rejectWithValue(e.message)
    }
})
