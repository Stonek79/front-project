import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import { Input } from '@/shared/ui/redesigned/Input'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { articleDetailsActions } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

interface ArticleEditTitleBlockProps {
    title: string
}

export const ArticleEditTitleBlock = ({
    title,
}: ArticleEditTitleBlockProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [currentTitle, setTitle] = useState('')

    useEffect(() => {
        if (title) setTitle(title)
    }, [title])

    const onChangeTitle = useCallback(
        (value: string) => {
            if (title) dispatch(articleDetailsActions.updateArticleTitle(value))
        },
        [title, dispatch],
    )

    const debounceFetchTitle = useDebounce(
        (value: string) => onChangeTitle(value),
        500,
    )

    const controlledTitle = (value: string) => {
        setTitle(value)
        debounceFetchTitle(value)
    }

    return (
        <VStack gap="16" max>
            <Text title={currentTitle} bold size="l" />
            <Input
                wrap
                labelBold
                label={`${t('Article Title')}:`}
                value={currentTitle}
                onChange={controlledTitle}
            />
        </VStack>
    )
}
