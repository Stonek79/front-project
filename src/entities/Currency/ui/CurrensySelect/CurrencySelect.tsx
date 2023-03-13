import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Select } from 'shared/ui/Select/Select'
import { createOptionsList } from 'shared/lib/createOptionsList/createOptionsList'
import { Currency } from '../../model/types/currency'

interface CurrencySelectProps {
    className?: string;
    value?: Currency
    readonly?: boolean
    onChange?: (value: Currency) => void
}

const options = createOptionsList(Currency)

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props
    const { t } = useTranslation()

    const cn = classNames('', {}, [className])

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [onChange])

    return (
        <Select
            className={cn}
            options={options}
            label={t('Currency')}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
