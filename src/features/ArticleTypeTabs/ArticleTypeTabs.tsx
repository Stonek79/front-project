import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from 'entities/Article'

interface ArticleTypeTabsProps {
    className?: string
    onChangeType: (type: ArticleType) => void
    value: ArticleType
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props
    const { t } = useTranslation()

    const cn = classNames('', {}, [className])

    const tabs = useMemo<TabItem<ArticleType>[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('All topics'),
        },
        {
            value: ArticleType.IT,
            content: t('IT'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Science'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Economics'),
        },
    ], [t])

    const onTabClick = useCallback((tab: TabItem<ArticleType>) => {
        onChangeType(tab.value as ArticleType)
    }, [onChangeType])

    return (
        <div className={cn}>
            <Tabs
                tabs={tabs}
                value={value}
                onTabClick={onTabClick}
            />
        </div>
    )
})
