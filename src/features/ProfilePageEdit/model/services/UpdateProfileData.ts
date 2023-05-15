import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile, ValidateErrors } from '@/entities/Profile'
import { ValidateProfileData } from './ValidateProfileData'
import { getProfileForm } from '../selectors/getProfileForm/getProfileForm'

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateErrors>
>('profile/updateProfileData', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI

    const formData = getProfileForm(getState())
    const errors = ValidateProfileData(formData)
    const profileId = formData?.id

    Object.entries(errors).forEach(([_, err]) => {
        if (err.length) {
            throw rejectWithValue(errors)
        }
    })

    try {
        const { data } = await extra.api.put<Profile>(
            `/profile/${profileId}`,
            formData,
        )

        if (!data) {
            return rejectWithValue(ValidateProfileData(data))
        }

        return data
    } catch (e: any | unknown) {
        return rejectWithValue(ValidateProfileData(e.message))
    }
})
