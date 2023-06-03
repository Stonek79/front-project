import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getAllFeatureFlags } from '../lib/setGetFeaturs'
import { FeatureFlags } from '@/shared/types/featureFlags'

interface UpdateFeatureFlagsOptions {
    userId: string
    newFeatureFlags: Partial<FeatureFlags>
}

export const UpdateFeatureFlags = createAsyncThunk<
    void,
    UpdateFeatureFlagsOptions,
    ThunkConfig<string>
>('user/saveJsonSettings', async ({ userId, newFeatureFlags }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: {
                    ...getAllFeatureFlags(),
                    ...newFeatureFlags,
                },
            }),
        )

        return window.location.reload()
    } catch (e) {
        console.log(e)
        return rejectWithValue('serverError')
    }
})
