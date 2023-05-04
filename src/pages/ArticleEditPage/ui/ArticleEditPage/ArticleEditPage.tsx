import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { Text } from '@/shared/ui/Text'
import { ArticleEdit } from '@/entities/Article'
import cls from './ArticleEditPage.module.scss'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const cn = classNames(cls.ArticleEditPage, {}, [className])

    console.log(id, 'ArticleEditPage')
    return (
        <Page className={cn}>
            {/* TODO add editor widget */}
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {!id ? <Text text="New article" /> : <ArticleEdit /> }
        </Page>
    )
}

export default ArticleEditPage
