import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import cls from '../ArticleEdit.module.scss'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { Input } from '@/shared/ui/redesigned/Input'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { articleDetailsActions } from '@/entities/Article'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ArticleEditImgBlockProps {
    imgPath: string
    title?: string
}

export const ArticleEditImgBlock = (props: ArticleEditImgBlockProps) => {
    const { imgPath, title } = props
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const [img, setImg] = useState('')

    useEffect(() => {
        if (imgPath) setImg(imgPath)
    }, [imgPath])

    const onChangeMainImage = useCallback(
        (value: string) => {
            if (imgPath)
                dispatch(articleDetailsActions.updateArticleImage(value))
        },
        [imgPath, dispatch],
    )

    const debounceFetchImg = useDebounce(
        (value: string) => onChangeMainImage(value),
        500,
    )

    const controlledImgPath = (value: string) => {
        setImg(value)
        debounceFetchImg(value)
    }

    return (
        <VStack gap="16" justify="center" max>
            <AppImage
                className={cls.img}
                src={imgPath}
                alt={title}
                fallback={<Skeleton height={420} width="100%" border="16" />}
            />
            <Input
                wrap
                labelBold
                label={`${t('Image Path')}:`}
                value={img}
                onChange={controlledImgPath}
            />
        </VStack>
    )
}
