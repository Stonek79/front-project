import { ArticleEditPageRedesignedAsync } from '../ArticleEditPageRedesigned/ArticleEditPageRedesigned.async'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props

    return <ArticleEditPageRedesignedAsync className={className} />
}

export default ArticleEditPage
