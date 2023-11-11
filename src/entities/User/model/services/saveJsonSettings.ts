import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { JsonSettings } from '../types/jsonSettings'
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData'
import { getJsonSettings } from '../selectors/getJsonSettings'
import { setJsonSettingsMutation } from '../../api/userApi'
import { ARTICLES_PAGE_GREETING } from '../consts/consts'

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newSettings, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI
    const userData = getUserAuthData(getState())
    const currentSettings = getJsonSettings(getState())

    if (!currentSettings.isArticlesPageOpened) {
        localStorage.setItem(ARTICLES_PAGE_GREETING, 'true')
    }

    if (!userData) {
        return rejectWithValue('no user data')
    }

    try {
        const res = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newSettings,
                },
            }),
        ).unwrap()

        if (!res.jsonSettings) {
            return rejectWithValue('server error')
        }

        return res.jsonSettings
    } catch (e: any | unknown) {
        console.log(e)
        return rejectWithValue('server error')
    }
})
