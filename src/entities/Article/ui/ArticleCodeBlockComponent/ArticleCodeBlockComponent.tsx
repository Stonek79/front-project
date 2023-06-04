import { memo } from 'react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleCodeBlock } from '../../model/types/article'
import { Code } from '@/shared/ui/redesigned/Code'

interface ArticleCodeBlockComponentProps {
    className?: string
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block } = props

        const cn = classNames('', {}, [className])

        return (
            <HStack className={cn}>
                <Code text={block.code} />
            </HStack>
        )
    },
)
