import { User } from '@/entities/User'
import {
    ArticleBlockTypes,
    ArticleSortField,
    ArticleTypes,
    ArticleView,
} from '../consts/consts'

export type ArticleTypesType = (typeof ArticleTypes)[keyof typeof ArticleTypes]
export type ArticleBlockTypesType =
    (typeof ArticleBlockTypes)[keyof typeof ArticleBlockTypes]
export type ArticleViewTypes = (typeof ArticleView)[keyof typeof ArticleView]
export type ArticleSortFieldTypes =
    (typeof ArticleSortField)[keyof typeof ArticleSortField]

export interface ArticleBlockBase {
    id: string
    type: ArticleBlockTypesType
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: typeof ArticleBlockTypes.CODE
    code: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: typeof ArticleBlockTypes.IMAGE
    src: string
    title?: string
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: typeof ArticleBlockTypes.TEXT
    title?: string
    paragraphs: string[]
}

export type ArticleBlock =
    | ArticleCodeBlock
    | ArticleImageBlock
    | ArticleTextBlock

export interface Article {
    id: string
    title: string
    subtitle: string
    img: string
    user: User
    userId?: string
    views: number
    createdAt: string
    type: ArticleTypesType[]
    blocks: ArticleBlock[]
}

export type NewArticle = {
    userId: string
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: ArticleTypesType[]
    blocks: ArticleBlock[]
}
