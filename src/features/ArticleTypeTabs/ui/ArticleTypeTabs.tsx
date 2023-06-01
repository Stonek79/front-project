import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleTypes, ArticleTypesType } from '@/entities/Article'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Tabs } from '@/shared/ui/redesigned/Tabs'
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
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <VStack gap="8" className={cn}>
                    <Text text={`${t('Topicks')}:`} />
                    <Tabs
                        direction="column"
                        tabs={tabs}
                        value={value}
                        onTabClick={onTabClick}
                    />
                </VStack>
            }
            off={
                <div className={cn}>
                    <TabsDeprecated
                        tabs={tabs}
                        value={value}
                        onTabClick={onTabClick}
                    />
                </div>
            }
        />
    )
})
