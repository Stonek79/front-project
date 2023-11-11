import { ARTICLES_PAGE_GREETING } from '../consts/consts'

export const getIsVisited = Boolean(
    localStorage.getItem(ARTICLES_PAGE_GREETING),
)
