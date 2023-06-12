import { useParams } from 'react-router-dom'
import { Text } from '@/shared/ui/deprecated/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { ArticleEdit } from '@/entities/Article'
import cls from './ArticleEditPageDeprecated.module.scss'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPageDeprecated = (props: ArticleEditPageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const cn = classNames(cls.ArticleEditPage, {}, [className])

    return (
        <Page className={cn}>
            {/* TODO add editor widget */}
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {!id ? <Text text="New article" /> : <ArticleEdit id={id} />}
        </Page>
    )
}

export default ArticleEditPageDeprecated
