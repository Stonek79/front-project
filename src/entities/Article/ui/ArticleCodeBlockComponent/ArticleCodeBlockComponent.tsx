import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleCodeBlock } from '../../model/types/article'
import { Code } from '@/shared/ui/redesigned/Code'
import { Textarea } from '@/shared/ui/redesigned/Textarea'

interface ArticleCodeBlockComponentProps {
    className?: string
    textareaId: string
    block: ArticleCodeBlock
    editable?: boolean
    editCode?: (value: string, block: ArticleCodeBlock) => void
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const {
            className,
            textareaId,
            block,
            editCode = () => '',
            editable,
        } = props
        const { t } = useTranslation()

        const cn = classNames('', {}, [className])

        return (
            <HStack className={cn}>
                <VStack gap="16" max>
                    <Code text={block.code} />
                    {editable && (
                        <Textarea
                            wrap
                            direction="horizontal"
                            labelBold
                            textareaId={textareaId}
                            onChange={(value) => editCode(value, block)}
                            label={`${t('Edit Code')}:`}
                            value={block.code}
                        />
                    )}
                </VStack>
            </HStack>
        )
    },
)
