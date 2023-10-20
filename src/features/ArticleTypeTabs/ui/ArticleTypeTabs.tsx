import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleTypes, ArticleTypesType } from '@/entities/Article'
import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'

interface ArticleTypeTabsProps {
    className?: string
    onChangeType: (type: ArticleTypesType) => void
    value: ArticleTypesType
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props
    const { t } = useTranslation()

    const cn = classNames('', {}, [className])

    const tabs = useMemo<TabItem<ArticleTypesType>[]>(
        () => [
            {
                value: ArticleTypes.ALL,
                content: t('All topics'),
            },
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

    const onTabClick = useCallback(
        (tab: TabItem<ArticleTypesType>) => {
            onChangeType(tab.value as ArticleTypesType)
        },
        [onChangeType],
    )

    return (
        <VStack gap="8" className={cn}>
            <Text text={`${t('Topics')}:`} />
            <Tabs
                direction="column"
                tabs={tabs}
                value={value}
                onTabClick={onTabClick}
            />
        </VStack>
    )
})
