import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleTypes, ArticleTypesType } from '@/entities/Article'
import { ListBox } from '@/shared/ui/redesigned/Popups'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Card } from '@/shared/ui/redesigned/Card'
import { TabItem } from '@/shared/ui/redesigned/Tabs'

interface ArticleTypeSelectorProps {
    className?: string
    types: ArticleTypesType[]
    onAddType: (type: ArticleTypesType) => void
    onRemoveType: (type: ArticleTypesType) => void
}
export const ArticleTypeSelector = (props: ArticleTypeSelectorProps) => {
    const { onAddType, onRemoveType, types } = props
    const { t } = useTranslation()

    const tabs = useMemo<TabItem<ArticleTypesType>[]>(
        () => [
            {
                value: ArticleTypes.IT,
                content: t('IT'),
            },
            {
                value: ArticleTypes.SCIENCE,
                content: t('Science'),
            },
            {
                value: ArticleTypes.ECONOMICS,
                content: t('Economics'),
            },
        ],
        [t],
    )

    return (
        <VStack>
            <HStack gap="4">
                {types.map((type) => (
                    <Card
                        key={type}
                        cardPaddings="4"
                        clickable
                        onClick={() => onRemoveType(type)}
                    >
                        {t(type)}
                    </Card>
                ))}
            </HStack>
            <ListBox
                onChange={onAddType}
                items={tabs}
                direction="bottom left"
                label={t('Topics')}
            />
        </VStack>
    )
}
