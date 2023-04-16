import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Page } from 'widgets/Page/ui/Page/Page'
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { fetchNextArticlesPage } from '../../models/services/fetchNextArticlesPage'
import { articlesPageReducer } from '../../models/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'
import { getArticlesHasMore } from '../../models/selectors/articlesPageSelectors'

interface ArticlesPageProps {
    className?: string;
}

const reducer: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const hasMore = useSelector(getArticlesHasMore)

    const cn = classNames(cls.ArticlesPage, {}, [className])

    const onLoadNextPage = useCallback(() => {
        if (hasMore) {
            dispatch(fetchNextArticlesPage())
        }
    }, [dispatch, hasMore])

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPage} className={cn}>
                <ArticlesPageFilters />
                <ArticleInfiniteList />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
