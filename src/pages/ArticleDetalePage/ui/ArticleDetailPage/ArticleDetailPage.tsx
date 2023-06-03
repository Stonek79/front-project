import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import cls from './ArticleDetailPage.module.scss'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import ArticleDetailPageRedesigned from '../ArticleDetailsPageRedesigned/ArticleDetailPageRedesigned'
import ArticleDetailPageDeprecated from '../ArticleDetailsPageDeprecated/ArticleDetailPageDeprecated'

export interface ArticleDetailPageProps {
    className?: string
}

const ArticleDetailPage = (props: ArticleDetailPageProps) => {
    const { className } = props
    const { id = '1' } = useParams<{ id: string }>()
    const { t } = useTranslation()

    if (!id) {
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t('Статья не найдена')}
            </Page>
        )
    }

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<ArticleDetailPageRedesigned />}
            off={<ArticleDetailPageDeprecated />}
        />
    )
}

export default memo(ArticleDetailPage)
