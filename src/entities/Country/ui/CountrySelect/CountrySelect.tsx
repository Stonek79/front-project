import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { createOptionsList } from 'shared/lib/createOptionsList/createOptionsList'
import { Countries } from '../../model/types/countries'

interface CountrySelectProps {
    className?: string;
    value?: Countries
    readonly?: boolean
    onChange?: (value: Countries) => void
}

const options = createOptionsList(Countries)

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props
    const { t } = useTranslation()

    const cn = classNames('', {}, [className])

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Countries)
    }, [onChange])

    return (
        <Select
            className={cn}
            options={options}
            label={t('Country')}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
