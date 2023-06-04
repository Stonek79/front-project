import { memo } from 'react'
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import { ArticleImageBlock } from '../../model/types/article'
import { ToggleComponentFeatures } from '@/shared/lib/features'

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
                    <ToggleComponentFeatures
                        feature="isAppRedesigned"
                        on={<Text text={block.title} align="center" />}
                        off={
                            <TextDeprecated
                                text={block.title}
                                align={TextAlign.CENTER}
                            />
                        }
                    />
                )}
            </VStack>
        )
    },
)
