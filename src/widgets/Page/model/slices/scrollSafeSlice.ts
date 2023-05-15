import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ScrollSafeSchema } from '../type/ScrollSafeSchema'

export const initialState: ScrollSafeSchema = {
    scroll: {},
}
const scrollSafeSlice = createSlice({
    name: 'scrollSafeSlice',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position
        },
    },
})

export const { reducer: scrollSafeReducer } = scrollSafeSlice
export const { actions: scrollSafeActions } = scrollSafeSlice
