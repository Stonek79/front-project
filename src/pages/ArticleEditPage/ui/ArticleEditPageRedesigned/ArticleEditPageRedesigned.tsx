import { useParams } from 'react-router-dom'
import { Text } from '@/shared/ui/redesigned/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { ArticleEdit } from '@/entities/Article'
import cls from './ArticleEditPageRedesigned.module.scss'
import { StickyLayout } from '@/shared/layouts'
import { ArticleEditPageContainer } from '../ArticleEditPageContainer/ArticleEditPageContainer'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPageRedesigned = (props: ArticleEditPageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const cn = classNames(cls.ArticleEditPage, {}, [className])

    const content = (
        <Page className={cn}>
            {!id ? <Text text="New article" /> : <ArticleEdit id={id} />}
        </Page>
    )
    return (
        <StickyLayout content={content} right={<ArticleEditPageContainer />} />
    )
}

export default ArticleEditPageRedesigned
