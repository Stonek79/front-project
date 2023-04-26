import { createSelector } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/StoreProvider'

export const getSafeScroll = (state: StateSchema) => state.scrollPosition.scroll
export const getSafeScrollByPAth = createSelector(
    getSafeScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
)
