import { memo } from 'react'
import { Text, TextAlign } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import { ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockComponentProps {
    className?: string
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props

        const cn = classNames('', {}, [className])

        return (
            <VStack max gap="16" align="center" className={cn}>
                <img src={block.src} alt={block.title} className={cls.img} />
                {block.title && (
                    <Text text={block.title} align={TextAlign.CENTER} />
                )}
            </VStack>
        )
    },
)
