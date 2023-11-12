import { nanoid } from 'nanoid'
import { useSelector } from 'react-redux'
import { memo, useEffect, useMemo } from 'react'
import { ArticleNewPageContainer } from '../../ui/ArticleNewPageContainer/ArticleNewPageContainer'
import { Page } from '@/widgets/Page'
import { ArticleEdit } from '@/features/ArticleEdit'
import { StickyLayout } from '@/shared/layouts'
import { getUserAuthData, User } from '@/entities/User'
import {
    Article,
    articleDetailsActions,
    articleBaseData,
} from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

export const ArticleNewPage = memo(() => {
    const user = useSelector(getUserAuthData) as User
    const dispatch = useAppDispatch()

    const articleData: Article = useMemo(
        () => ({
            ...articleBaseData,
            id: nanoid(10),
            createdAt: new Date().toLocaleDateString().split('/').join('.'),
            user,
        }),
        [user],
    )

    useEffect(() => {
        dispatch(articleDetailsActions.setNewArticleForm(articleData))
    }, [articleData, dispatch])

    const content = (
        <Page>
            <ArticleEdit articleBaseData={articleData} />
        </Page>
    )

    return (
        <StickyLayout content={content} right={<ArticleNewPageContainer />} />
    )
})
