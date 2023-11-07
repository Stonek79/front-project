import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/redesigned/Card'
import cls from './ArticleDelete.module.scss'

interface ArticleDeleteProps {
    id: string
    onClick: () => void
}
export const ArticleDelete = (props: ArticleDeleteProps) => {
    const { id, onClick } = props
    const { t } = useTranslation()

    if (!id) {
        return null
    }

    return (
        <Card
            className={cls.ArticleDelete}
            clickable
            onClick={onClick}
            cardBorder="standard"
            cardPaddings="16"
            max
        >
            {t('Delete article')}
        </Card>
    )
}
