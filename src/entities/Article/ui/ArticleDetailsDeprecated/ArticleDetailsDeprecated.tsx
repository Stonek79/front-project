import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
} from '@/shared/ui/deprecated/Text'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import DateIcon from '@/shared/assets/icons/date-schedule.svg'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import {
    getArticleDetailsData,
    getArticleErrorData,
    getArticleIsLoadingData,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import cls from './ArticleDetailsDeprecated.module.scss'
import { ArticleBlock } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleBlockTypes } from '../../model/consts/consts'
import { getRouteNotFound } from '@/shared/const/router'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'

interface ArticleDetailsProps {
    className?: string
    id?: string
}

const articleDetailsReducers: ReducersList = {
    article: articleDetailsReducer,
}

export const ArticleDetailsDeprecated = memo((props: ArticleDetailsProps) => {
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
                        textareaId={`${block.id + block.code.length}deprecated`}
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
            <VStack justify="center" align="center" max gap="16">
                <SkeletonDeprecated
                    className={cls.avatar}
                    height={200}
                    width={200}
                    border="50%"
                />
                <SkeletonDeprecated
                    className={cls.title}
                    width={300}
                    height={24}
                />
                <SkeletonDeprecated
                    className={cls.skeleton}
                    width={500}
                    height={32}
                />
                <SkeletonDeprecated
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
                <SkeletonDeprecated
                    className={cls.skeleton}
                    width="100%"
                    height={200}
                />
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
            content = (
                <TextDeprecated align={TextAlign.CENTER} text={articleError} />
            )
        }
    } else {
        content = (
            <VStack max>
                <HStack justify="center" max>
                    <AvatarDeprecated
                        className={cls.avatar}
                        src={articleData?.img}
                        size={200}
                        alt={articleData?.title}
                    />
                </HStack>
                <VStack data-testid="ArticleDetails.body" gap="4" max>
                    <TextDeprecated
                        className={cls.title}
                        text={articleData?.subtitle}
                        title={articleData?.title}
                        size={TextSize.L}
                    />
                    <HStack gap="8" className={cls.articleInfo}>
                        <IconDeprecated Svg={EyeIcon} className={cls.icon} />
                        <TextDeprecated text={String(articleData?.views)} />
                    </HStack>
                    <HStack gap="8">
                        <IconDeprecated Svg={DateIcon} className={cls.icon} />
                        <TextDeprecated text={articleData?.createdAt} />
                    </HStack>
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
