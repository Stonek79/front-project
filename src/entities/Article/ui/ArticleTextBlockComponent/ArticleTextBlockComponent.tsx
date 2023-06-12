import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleTextBlock } from '../../model/types/article'
import cls from './ArticleTextBlockComponent.module.scss'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Input } from '@/shared/ui/redesigned/Input'
import { Textarea } from '@/shared/ui/redesigned/Textarea'

export type TextGap = '4' | '8' | '16' | '24' | '32'

const gapClasses: Record<TextGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
}

interface ArticleTextBlockComponentProps {
    className?: string
    block: ArticleTextBlock
    editable?: boolean
    gap?: TextGap
    editTitleFn?: (value: string, block: ArticleTextBlock) => void
    editParagraphFn?: (value: string, block: ArticleTextBlock) => void
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const {
            className,
            block,
            gap,
            editTitleFn = () => '',
            editParagraphFn = () => '',
            editable = false,
        } = props
        const { t } = useTranslation()

        const cn = classNames('', {}, [className, gap && gapClasses[gap]])

        return (
            <VStack gap={gap} max className={cn}>
                {block.title && (
                    <ToggleComponentFeatures
                        feature="isAppRedesigned"
                        on={
                            <VStack
                                justify="center"
                                align="center"
                                gap="16"
                                max
                            >
                                <Text
                                    title={block.title}
                                    className={cls.title}
                                />
                                {editable && (
                                    <Input
                                        wrap
                                        labelBold
                                        label={`${t('Edit title')}:`}
                                        value={block.title}
                                        onChange={(value) =>
                                            editTitleFn(value, block)
                                        }
                                    />
                                )}
                            </VStack>
                        }
                        off={
                            <TextDeprecated
                                title={block.title}
                                className={cls.title}
                            />
                        }
                    />
                )}
                {block.paragraphs && (
                    <ToggleComponentFeatures
                        feature="isAppRedesigned"
                        on={
                            <VStack gap="16" max>
                                {editable ? (
                                    <Textarea
                                        wrap
                                        labelBold
                                        direction="horizontal"
                                        textareaId={
                                            block.paragraphs.join('/n').length +
                                            block.id
                                        }
                                        label={`${t('Edit text')}:`}
                                        value={block.paragraphs.join('/n')}
                                        onChange={(value) =>
                                            editParagraphFn(value, block)
                                        }
                                    />
                                ) : (
                                    <Text
                                        key={block.paragraphs.join('/n')}
                                        text={block.paragraphs.join('/n')}
                                        className={cls.paragraph}
                                    />
                                )}
                            </VStack>
                        }
                        off={
                            <TextDeprecated
                                key={block.paragraphs.join('/n')}
                                text={block.paragraphs.join('/n')}
                                className={cls.paragraph}
                            />
                        }
                    />
                )}
            </VStack>
        )
    },
)
