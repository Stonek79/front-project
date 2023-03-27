import { User } from 'entities/User'

export enum ArticleSortField {
    VIEW = 'views',
    TITLE = 'title',
    CREATED = 'createdAt',
    ALL = '',
}

export enum ArticleBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT'
}

export enum ArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
    ALL = 'ALL'
}

export enum ArticleView {
    LIST = 'LIST',
    CARDS = 'CARDS'
}

export interface ArticleBlockBase {
    id: string,
    type: ArticleBlockType
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE
    code: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE
    src: string
    title?: string
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT
    title?: string
    paragraphs: string[]
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export interface Article {
    id: string,
    title: string,
    subtitle: string,
    img: string,
    user: User,
    views: number,
    createdAt: string,
    type: ArticleType[],
    blocks: ArticleBlock[]
}
