import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import EyeIcon from 'shared/assets/icons/eye.svg'
import DateIcon from 'shared/assets/icons/date-schedule.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Navigate, useLocation } from 'react-router-dom'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
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
import { ArticleBlock, ArticleBlockType } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface ArticleDetailsProps {
    className?: string;
    id: string
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
        case ArticleBlockType.CODE:
            return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />
        default:
            return null
        }
    }, [])

    useInitialEffect(() => {
        dispatch(fetchArticleById(id))
    })

    let content

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} height={200} width={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={24} />
                <Skeleton className={cls.skeleton} width={500} height={32} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        )
    } else if (articleError) {
        if (articleError === '404') {
            content = (<Navigate to={RoutePath.not_found} state={{ from: location }} replace />)
        } else {
            content = (<Text align={TextAlign.CENTER} text={articleError} />)
        }
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        className={cls.avatar}
                        src={articleData?.img}
                        size={200}
                        alt={articleData?.title}
                    />
                </div>
                <Text
                    className={cls.title}
                    text={articleData?.subtitle}
                    title={articleData?.title}
                    size={TextSize.L}
                />
                <div className={cls.articleInfo}>
                    <Icon Svg={EyeIcon} className={cls.icon} />
                    <Text text={String(articleData?.views)} />

                </div>
                <div className={cls.articleInfo}>
                    <Icon Svg={DateIcon} className={cls.icon} />
                    <Text text={articleData?.createdAt} />
                </div>
                {articleData?.blocks.map(renderBlock)}
            </>
        )
    }
    return (
        <DynamicModuleLoader reducers={articleDetailsReducers} removeAfterUnmount={Boolean(false)}>
            <div className={cn}>
                {content}
            </div>
        </DynamicModuleLoader>
    )
})
