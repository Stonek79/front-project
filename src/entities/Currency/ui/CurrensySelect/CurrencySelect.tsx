import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { createOptionsList } from 'shared/lib/createOptionsList/createOptionsList'
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
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
        <ListBox
            className={cn}
            onChange={onChangeHandler}
            value={value}
            items={options}
            label={t('Currency')}
            readonly={readonly}
            direction="bottom right"
        />
    )
});
