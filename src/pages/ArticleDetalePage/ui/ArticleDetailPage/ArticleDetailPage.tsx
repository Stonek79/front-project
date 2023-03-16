import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailPage.module.scss'

interface ArticleDetailPageProps {
    className?: string;
}

const ArticleDetailPage = memo((props: ArticleDetailPageProps) => {
    const { className } = props
    const { t } = useTranslation()

    const cn = classNames(cls.ArticleDetailPage, {}, [className])

    return (
        <div className={cn}>
            {t('Article detail page')}
        </div>
    )
})

export default memo(ArticleDetailPage)
