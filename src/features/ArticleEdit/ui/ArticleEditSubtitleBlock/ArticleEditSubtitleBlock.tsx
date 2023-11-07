import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import { Input } from '@/shared/ui/redesigned/Input'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { articleDetailsActions } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

interface ArticleEditSubtitleBlockProps {
    subtitle: string
}

export const ArticleEditSubtitleBlock = ({
    subtitle,
}: ArticleEditSubtitleBlockProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [currentSubtitle, setTitle] = useState('')

    useEffect(() => {
        if (subtitle) setTitle(subtitle)
    }, [subtitle])

    const onChangeSubtitle = useCallback(
        (value: string) => {
            if (subtitle)
                dispatch(articleDetailsActions.updateArticleSubtitle(value))
        },
        [subtitle, dispatch],
    )

    const debounceFetchSubtitle = useDebounce(
        (value: string) => onChangeSubtitle(value),
        500,
    )

    const controlledSubtitle = (value: string) => {
        setTitle(value)
        debounceFetchSubtitle(value)
    }

    return (
        <VStack gap="16" max>
            <Text title={currentSubtitle} bold size="l" />
            <Input
                wrap
                labelBold
                label={`${t('Article Subtitle')}:`}
                value={currentSubtitle}
                onChange={controlledSubtitle}
            />
        </VStack>
    )
}
