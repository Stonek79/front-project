import { useParams } from 'react-router-dom'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import cls from './ArticleEditPageRedesigned.module.scss'
import { StickyLayout } from '@/shared/layouts'
import { ArticleEditPageContainer } from '../ArticleEditPageContainer/ArticleEditPageContainer'
import { ArticleEdit } from '@/features/ArticleEdit'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '@/entities/Article'

interface ArticleEditPageProps {
    className?: string
}

const reducer: ReducersList = {
    article: articleDetailsReducer,
}

const ArticleEditPageRedesigned = (props: ArticleEditPageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const cn = classNames(cls.ArticleEditPage, {}, [className])

    const content = (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
            <Page className={cn}>
                <ArticleEdit id={id} />
            </Page>
        </DynamicModuleLoader>
    )
    return (
        <StickyLayout content={content} right={<ArticleEditPageContainer />} />
    )
}

export default memo(ArticleEditPageRedesigned)
