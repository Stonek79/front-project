import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import cls from './ArticleEditPage.module.scss'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const hasEdit = Boolean(id)
    const cn = classNames(cls.ArticleEditPage, {}, [className])

    return (
        <Page className={cn}>
            {/* TODO add editor widget */}
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {hasEdit ? <Text text="Edit article" /> : <Text text="New article" /> }
        </Page>
    )
}

export default ArticleEditPage
