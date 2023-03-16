import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo((props: ArticlesPageProps) => {
    const { className } = props
    const { t } = useTranslation()

    const cn = classNames(cls.ArticlesPage, {}, [className])

    return (
        <div className={cn}>
            {t('Articles page')}
        </div>
    )
})

export default memo(ArticlesPage)
