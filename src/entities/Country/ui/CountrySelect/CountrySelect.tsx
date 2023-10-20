import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { createOptionsList } from '@/shared/lib/createOptionsList/createOptionsList'
import { Countries } from '../../model/types/countries'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface CountrySelectProps {
    className?: string
    value?: Countries
    readonly?: boolean
    onChange?: (value: Countries) => void
}

const options = createOptionsList(Countries)

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props
    const { t } = useTranslation()

    const cn = classNames('', {}, [className])

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Countries)
        },
        [onChange],
    )

    const listBoxProps = {
        onChange: onChangeHandler,
        readonly,
        className: cn,
        value,
        label: `${t('Country')}:`,
        items: options,
        direction: 'bottom right' as const,
    }

    return <ListBox {...listBoxProps} />
})
