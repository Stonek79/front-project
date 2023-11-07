import { memo, useCallback, useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { nanoid } from 'nanoid'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleTextBlock } from '../../model/types/article'
import cls from './ArticleTextBlockComponent.module.scss'
import { Input } from '@/shared/ui/redesigned/Input'
import { Textarea } from '@/shared/ui/redesigned/Textarea'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articleDetailsActions } from '../../model/slice/articleDetailsSlice'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

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
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block, gap, editable = false } = props
        const { t } = useTranslation()
        const textareaId = useId()
        const cn = classNames('', {}, [className, gap && gapClasses[gap]])

        const dispatch = useAppDispatch()
        const [textTitle, setTextTitle] = useState(block.title)
        const [textParagraph, setTextParagraph] = useState(block.paragraphs)

        useEffect(() => {
            if (block) {
                setTextTitle(block.title)
                setTextParagraph(block.paragraphs)
            }
        }, [block])

        const onChangeBlockImg = useCallback(
            (
                type: 'paragraphs' | 'title',
                value: string,
                block: ArticleTextBlock,
            ) => {
                dispatch(
                    articleDetailsActions.updateArticleBlock({
                        ...block,
                        [type]: value,
                    }),
                )
            },
            [dispatch],
        )

        const debounceFetchImg = useDebounce(
            (type: 'paragraphs' | 'title', value: string) =>
                onChangeBlockImg(type, value, block),
            500,
        )

        const controlledTextParagraph = (value: string) => {
            setTextParagraph(value.split('/n'))
            debounceFetchImg('paragraphs', value.split('/n'))
        }

        const controlledTextTitle = (value: string) => {
            setTextTitle(value)
            debounceFetchImg('title', value)
        }

        return (
            // TODO fix text title which disappear without text
            <VStack gap={gap} max className={cn}>
                {textTitle && (
                    <VStack justify="center" align="center" gap="16" max>
                        <Text title={textTitle} className={cls.title} />
                        {editable && (
                            <Input
                                wrap
                                labelBold
                                label={`${t('Edit title')}:`}
                                value={textTitle}
                                onChange={controlledTextTitle}
                            />
                        )}
                    </VStack>
                )}
                {textParagraph && (
                    <VStack gap="16" max>
                        {editable ? (
                            <Textarea
                                wrap
                                labelBold
                                direction="horizontal"
                                textareaId={textareaId}
                                label={`${t('Edit text')}:`}
                                value={textParagraph.join('/n')}
                                onChange={controlledTextParagraph}
                            />
                        ) : (
                            <>
                                {block.paragraphs.map((paragraph) => (
                                    <Text
                                        indent
                                        align="justify"
                                        key={nanoid(10)}
                                        text={paragraph}
                                        className={cls.paragraph}
                                    />
                                ))}
                            </>
                        )}
                    </VStack>
                )}
            </VStack>
        )
    },
)
