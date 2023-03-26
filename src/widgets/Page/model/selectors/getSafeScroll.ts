import { StateSchema } from 'app/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getSafeScroll = (state: StateSchema) => state.scrollPosition.scroll
export const getSafeScrollByPAth = createSelector(
    getSafeScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
)
