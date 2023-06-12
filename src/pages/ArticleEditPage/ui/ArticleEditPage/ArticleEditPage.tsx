import { ToggleComponentFeatures } from '@/shared/lib/features'
import { ArticleEditPageRedesignedAsync } from '../ArticleEditPageRedesigned/ArticleEditPageRedesigned.async'
import { ArticleEditPageDeprecatedAsync } from '../ArticleEditPageDeprecated/ArticleEditPageDeprecated.async'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<ArticleEditPageRedesignedAsync className={className} />}
            off={<ArticleEditPageDeprecatedAsync className={className} />}
        />
    )
}

export default ArticleEditPage
