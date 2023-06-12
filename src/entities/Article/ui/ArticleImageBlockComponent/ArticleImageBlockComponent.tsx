import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import { ArticleImageBlock } from '../../model/types/article'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Input } from '@/shared/ui/redesigned/Input'

interface ArticleImageBlockComponentProps {
    className?: string
    block: ArticleImageBlock
    editable?: boolean
    editTitle?: (value: string, block: ArticleImageBlock) => void
    editSrc?: (value: string, block: ArticleImageBlock) => void
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const {
            className,
            block,
            editTitle = () => '',
            editSrc = () => '',
            editable,
        } = props
        const { t } = useTranslation()

        const cn = classNames('', {}, [className])

        return (
            <VStack max gap="16" align="center" className={cn}>
                <img src={block.src} alt={block.title} className={cls.img} />
                {block.title && (
                    <ToggleComponentFeatures
                        feature="isAppRedesigned"
                        on={
                            <VStack align="center" gap="16" max>
                                <Text text={block.title} align="center" />
                                {editable && (
                                    <>
                                        <Input
                                            wrap
                                            labelBold
                                            onChange={(value) =>
                                                editTitle(value, block)
                                            }
                                            label={`${t('Image title')}:`}
                                            value={block.title}
                                        />
                                        <Input
                                            wrap
                                            labelBold
                                            label={t('Image Path')}
                                            onChange={(value) =>
                                                editSrc(value, block)
                                            }
                                            value={block.src}
                                        />
                                    </>
                                )}
                            </VStack>
                        }
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
