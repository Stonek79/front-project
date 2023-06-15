import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { Text } from '@/shared/ui/redesigned/Text'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import {
    getArticleDetailsData,
    getArticleErrorData,
    getArticleIsLoadingData,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import cls from './ArticleDetailsRedesigned.module.scss'
import { ArticleBlock } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleBlockTypes } from '../../model/consts/consts'
import { getRouteNotFound } from '@/shared/const/router'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { AppImage } from '@/shared/ui/redesigned/AppImage'

interface ArticleDetailsProps {
    className?: string
    id?: string
}

const articleDetailsReducers: ReducersList = {
    article: articleDetailsReducer,
}

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsProps) => {
    const { className, id } = props
    const location = useLocation()
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleIsLoadingData)
    const articleData = useSelector(getArticleDetailsData)
    const articleError = useSelector(getArticleErrorData)

    const cn = classNames(cls.ArticleDetails, {}, [className])

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockTypes.CODE:
                return (
                    <ArticleCodeBlockComponent
                        textareaId={nanoid(10)}
                        key={block.id}
                        block={block}
                    />
                )
            case ArticleBlockTypes.IMAGE:
                return (
                    <ArticleImageBlockComponent key={block.id} block={block} />
                )
            case ArticleBlockTypes.TEXT:
                return (
                    <ArticleTextBlockComponent key={block.id} block={block} />
                )
            default:
                return null
        }
    }, [])

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id))
        }
    }, [id, dispatch])

    let content

    if (isLoading) {
        content = (
            <VStack max gap="16">
                <Skeleton className={cls.title} width={500} height={24} />
                <Skeleton className={cls.skeleton} width={300} height={32} />
                <Skeleton className={cls.avatar} height={420} width="100%" />

                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </VStack>
        )
    } else if (articleError) {
        if (articleError === '404') {
            content = (
                <Navigate
                    to={getRouteNotFound()}
                    state={{ from: location }}
                    replace
                />
            )
        } else {
            content = <Text align="center" text={articleError} />
        }
    } else {
        content = (
            <VStack max gap="8">
                <Text title={articleData?.title} bold size="l" />
                <Text title={articleData?.subtitle} size="m" />
                <HStack justify="center" max>
                    <AppImage
                        className={cls.img}
                        src={articleData?.img}
                        alt={articleData?.title}
                        fallback={
                            <Skeleton height={420} width="100%" border="16" />
                        }
                    />
                </HStack>
                <VStack data-testid="ArticleDetails.body" gap="4" max>
                    <VStack max gap="16" align="center">
                        {articleData?.blocks.map(renderBlock)}
                    </VStack>
                </VStack>
            </VStack>
        )
    }

    return (
        <DynamicModuleLoader
            reducers={articleDetailsReducers}
            removeAfterUnmount={Boolean(false)}
        >
            <VStack max gap="16" className={cn}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    )
})
