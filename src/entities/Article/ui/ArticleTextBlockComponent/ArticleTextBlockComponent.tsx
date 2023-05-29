import { memo } from 'react'
import { Text } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/deprecated/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleTextBlock } from '../../model/types/article'
import cls from './ArticleTextBlockComponent.module.scss'

interface ArticleTextBlockComponentProps {
    className?: string
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block } = props

        const cn = classNames('', {}, [className])

        return (
            <VStack max className={cn}>
                {block.title && (
                    <Text title={block.title} className={cls.title} />
                )}
                {block.paragraphs.map((paragraph) => (
                    <Text
                        key={paragraph}
                        text={paragraph}
                        className={cls.paragraph}
                    />
                ))}
            </VStack>
        )
    },
)
