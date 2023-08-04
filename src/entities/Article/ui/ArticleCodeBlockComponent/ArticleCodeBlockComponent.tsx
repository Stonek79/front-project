import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleCodeBlock } from '../../model/types/article'
import { Code } from '@/shared/ui/redesigned/Code'
import { Textarea } from '@/shared/ui/redesigned/Textarea'
import { articleDetailsActions } from '../../model/slice/articleDetailsSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

interface ArticleCodeBlockComponentProps {
    className?: string
    textareaId: string
    block: ArticleCodeBlock
    editable?: boolean
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, textareaId, block, editable } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const [currentCode, setCode] = useState(block.code)

        useEffect(() => {
            if (block) setCode(block.code)
        }, [block])

        const cn = classNames('', {}, [className])

        const onChangeBlockCode = useCallback(
            (value: string, block: ArticleCodeBlock) => {
                dispatch(
                    articleDetailsActions.updateArticleBlock({
                        ...block,
                        code: value,
                    }),
                )
            },
            [dispatch],
        )

        const debounceFetchCode = useDebounce(
            (value: string) => onChangeBlockCode(value, block),
            500,
        )

        const controlledCode = (value: string) => {
            setCode(value)
            debounceFetchCode(value)
        }

        return (
            <HStack className={cn}>
                <VStack gap="16" max>
                    <Code text={currentCode} />
                    {editable && (
                        <Textarea
                            wrap
                            direction="horizontal"
                            labelBold
                            textareaId={textareaId}
                            onChange={controlledCode}
                            label={`${t('Edit Code')}:`}
                            value={currentCode}
                        />
                    )}
                </VStack>
            </HStack>
        )
    },
)
