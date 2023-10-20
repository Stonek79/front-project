import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import cls from './ArticleDetailPage.module.scss'
import ArticleDetailPageRedesigned from '../ArticleDetailsPageRedesigned/ArticleDetailPageRedesigned'

export interface ArticleDetailPageProps {
    className?: string
}

const ArticleDetailPage = (props: ArticleDetailPageProps) => {
    const { className } = props
    const { id = '1' } = useParams<{ id: string }>()
    const { t } = useTranslation()
    const cn = classNames(cls.ArticleDetailsPage, {}, [className])

    if (!id) {
        return <Page className={cn}>{t('Article not found')}</Page>
    }

    return <ArticleDetailPageRedesigned />
}

export default memo(ArticleDetailPage)
