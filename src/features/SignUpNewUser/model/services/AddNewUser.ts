import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, addUserMutation, userActions } from '@/entities/User'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { signUpErrors } from '../consts/consts'

export const addNewUser = createAsyncThunk<User, User, ThunkConfig<string>>(
    'users/addNewUser',
    async (newUser: User, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            const res = await dispatch(addUserMutation(newUser)).unwrap()

            if (!res) {
                throw Error('server error')
            }

            dispatch(userActions.setAuthData(res))

            return res
        } catch (e: any | unknown) {
            console.log(e)
            if (e.status === 409) {
                return rejectWithValue(signUpErrors.EXIST)
            }
            return rejectWithValue(e.data.message)
        }
    },
)
