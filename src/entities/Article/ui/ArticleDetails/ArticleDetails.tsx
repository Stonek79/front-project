import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text, TextAlign, TextSize } from '@/shared/ui/Text'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Avatar } from '@/shared/ui/Avatar'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import DateIcon from '@/shared/assets/icons/date-schedule.svg'
import { Icon } from '@/shared/ui/Icon'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { HStack, VStack } from '@/shared/ui/Stack'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import {
    getArticleDetailsData,
    getArticleErrorData,
    getArticleIsLoadingData,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import cls from './ArticleDetails.module.scss'
import { ArticleBlock } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleBlockTypes } from '../../model/consts/consts';
import { getRouteNotFound } from '@/shared/const/router';

interface ArticleDetailsProps {
    className?: string;
    id?: string
}

const articleDetailsReducers: ReducersList = {
    article: articleDetailsReducer,
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props
    const location = useLocation();
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleIsLoadingData)
    const articleData = useSelector(getArticleDetailsData)
    const articleError = useSelector(getArticleErrorData)

    const cn = classNames(cls.ArticleDetails, {}, [className])

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockTypes.CODE:
            return <ArticleCodeBlockComponent key={block.id} block={block} />
        case ArticleBlockTypes.IMAGE:
            return <ArticleImageBlockComponent key={block.id} block={block} />
        case ArticleBlockTypes.TEXT:
            return <ArticleTextBlockComponent key={block.id} block={block} />
        default:
            return null
        }
    }, [])

    useInitialEffect(() => {
        dispatch(fetchArticleById(id))
    }, [id, dispatch])

    let content

    if (isLoading) {
        content = (
            <VStack justify="center" align="center" max gap="16">
                <Skeleton className={cls.avatar} height={200} width={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={24} />
                <Skeleton className={cls.skeleton} width={500} height={32} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </VStack>
        )
    } else if (articleError) {
        if (articleError === '404') {
            content = (<Navigate to={getRouteNotFound()} state={{ from: location }} replace />)
        } else {
            content = (<Text align={TextAlign.CENTER} text={articleError} />)
        }
    } else {
        content = (
            <VStack max>
                <HStack justify="center" max>
                    <Avatar
                        className={cls.avatar}
                        src={articleData?.img}
                        size={200}
                        alt={articleData?.title}
                    />
                </HStack>
                <VStack gap="4" max>
                    <Text
                        className={cls.title}
                        text={articleData?.subtitle}
                        title={articleData?.title}
                        size={TextSize.L}
                    />
                    <HStack gap="8" className={cls.articleInfo}>
                        <Icon Svg={EyeIcon} className={cls.icon} />
                        <Text text={String(articleData?.views)} />
                    </HStack>
                    <HStack gap="8">
                        <Icon Svg={DateIcon} className={cls.icon} />
                        <Text text={articleData?.createdAt} />
                    </HStack>
                    <VStack max gap="16" align="center">
                        {articleData?.blocks.map(renderBlock)}
                    </VStack>
                </VStack>
            </VStack>
        )
    }
    return (
        <DynamicModuleLoader reducers={articleDetailsReducers} removeAfterUnmount={Boolean(false)}>
            <VStack max gap="16" className={cn}>
                {content}
            </VStack>
        </DynamicModuleLoader>
    )
})
