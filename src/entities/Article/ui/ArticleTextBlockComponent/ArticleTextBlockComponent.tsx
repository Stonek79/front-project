import { memo } from 'react'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleTextBlock } from '../../model/types/article'
import cls from './ArticleTextBlockComponent.module.scss'
import { ToggleComponentFeatures } from '@/shared/lib/features'

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
                    <ToggleComponentFeatures
                        feature="isAppRedesigned"
                        on={<Text title={block.title} className={cls.title} />}
                        off={
                            <TextDeprecated
                                title={block.title}
                                className={cls.title}
                            />
                        }
                    />
                )}
                {block.paragraphs.map((paragraph) => (
                    <ToggleComponentFeatures
                        feature="isAppRedesigned"
                        on={
                            <Text
                                key={paragraph}
                                text={paragraph}
                                className={cls.paragraph}
                            />
                        }
                        off={
                            <TextDeprecated
                                key={paragraph}
                                text={paragraph}
                                className={cls.paragraph}
                            />
                        }
                    />
                ))}
            </VStack>
        )
    },
)
