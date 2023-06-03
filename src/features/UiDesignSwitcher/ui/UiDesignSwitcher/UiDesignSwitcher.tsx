import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ListBox } from '@/shared/ui/redesigned/Popups'
import { getFeatureFlags, UpdateFeatureFlags } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from '@/entities/User'

interface UiDesignSwitcherProps {
    className?: string
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)
    const isAppRedesigned = getFeatureFlags('isAppRedesigned')

    const items = [
        {
            content: t('New'),
            value: 'new',
        },
        {
            content: t('Old'),
            value: 'old',
        },
    ]

    const onChange = (value: string) => {
        if (authData)
            dispatch(
                UpdateFeatureFlags({
                    userId: authData?.id,
                    newFeatureFlags: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            )
    }

    return (
        <ListBox
            items={items}
            label={`${t('Design switcher')}:`}
            value={isAppRedesigned ? 'new' : 'old'}
            className={className}
            onChange={onChange}
            direction="top right"
        />
    )
})
