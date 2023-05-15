export { Page } from './ui/Page/Page'
export type { ScrollSafeSchema } from './model/type/ScrollSafeSchema'
export {
    getSafeScroll,
    getSafeScrollByPAth,
} from './model/selectors/getSafeScroll'
export {
    initialState,
    scrollSafeReducer,
    scrollSafeActions,
} from './model/slices/scrollSafeSlice'
