import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Code } from 'shared/ui/Code/Code'
import cls from './ArticleCodeBlockComponent.module.scss'
import { ArticleCodeBlock } from '../../model/types/article'

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props

    const cn = classNames(cls.ArticleCodeBlockComponent, {}, [className])

    return (
        <div className={cn}>
            <Code text={block.code} />
        </div>
    )
})
