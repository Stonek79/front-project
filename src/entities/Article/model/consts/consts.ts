export const ArticleSortField = {
    VIEW: 'views',
    TITLE: 'title',
    CREATED: 'createdAt',
    ALL: 'default',
} as const

export const ArticleBlockTypes = {
    CODE: 'CODE',
    IMAGE: 'IMAGE',
    TEXT: 'TEXT',
} as const

export const ArticleTypes = {
    IT: 'IT',
    SCIENCE: 'SCIENCE',
    ECONOMICS: 'ECONOMICS',
    ALL: 'ALL',
} as const

export const ArticleView = {
    LIST: 'LIST',
    CARDS: 'CARDS',
} as const

export const NewArticleCodeBlock = {
    id: '',
    type: 'CODE',
    code: 'Code text',
}

export const NewArticleImageBlock = {
    id: '',
    type: 'IMAGE',
    src: 'Img link',
    title: 'Image title',
}

export const NewArticleTextBlock = {
    id: '',
    type: 'TEXT',
    title: 'Text block title',
    paragraphs: ['Text block content'],
}
