import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, addUserMutation, userActions } from '@/entities/User'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { signUpErrors } from '../consts/consts'
import { createProfile } from '../../../ProfilePageEdit/model/services/CreateProfile'

interface AddNewUserProps {
    newUser: User
    profileRoute?: (id: string) => void
}

export const addNewUser = createAsyncThunk<
    User,
    AddNewUserProps,
    ThunkConfig<string>
>('users/addNewUser', async ({ newUser, profileRoute }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        const res = await dispatch(addUserMutation(newUser)).unwrap()

        if (!res) {
            throw Error('server error')
        }

        dispatch(userActions.setAuthData(res))
        dispatch(
            createProfile({
                user: res,
                profileRoute,
            }),
        )

        return res
    } catch (e: any | unknown) {
        console.log(e)
        if (e.status === 409) {
            return rejectWithValue(signUpErrors.EXIST)
        }
        return rejectWithValue(e.data.message)
    }
})
