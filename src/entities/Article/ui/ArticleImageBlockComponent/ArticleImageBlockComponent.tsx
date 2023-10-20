import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import { ArticleImageBlock } from '../../model/types/article'
import { Input } from '@/shared/ui/redesigned/Input'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articleDetailsActions } from '../../model/slice/articleDetailsSlice'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

interface ArticleImageBlockComponentProps {
    className?: string
    block: ArticleImageBlock
    editable?: boolean
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block, editable } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const [imagePath, setImagePath] = useState(block.src)
        const [imageTitle, setImageTitle] = useState(block.title)

        useEffect(() => {
            if (block) {
                setImagePath(block.src)
                setImageTitle(block.title)
            }
        }, [block])

        const cn = classNames('', {}, [className])

        const onChangeBlockImg = useCallback(
            (
                type: 'src' | 'title',
                value: string,
                block: ArticleImageBlock,
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
            (type: 'src' | 'title', value: string) =>
                onChangeBlockImg(type, value, block),
            500,
        )

        const controlledImgPath = (value: string) => {
            setImagePath(value)
            debounceFetchImg('src', value)
        }

        const controlledImgTitle = (value: string) => {
            setImageTitle(value)
            debounceFetchImg('title', value)
        }

        return (
            <VStack max gap="16" align="center" className={cn}>
                <AppImage
                    src={block.src}
                    alt={block.title ?? 'IMAGE'}
                    className={cls.img}
                />
                {block.title && (
                    <VStack align="center" gap="16" max>
                        <Text text={imageTitle} align="center" />
                        {editable && (
                            <>
                                <Input
                                    wrap
                                    labelBold
                                    onChange={controlledImgTitle}
                                    label={`${t('Image title')}:`}
                                    value={imageTitle}
                                />
                                <Input
                                    wrap
                                    labelBold
                                    label={t('Image Path')}
                                    onChange={controlledImgPath}
                                    value={imagePath}
                                />
                            </>
                        )}
                    </VStack>
                )}
            </VStack>
        )
    },
)
