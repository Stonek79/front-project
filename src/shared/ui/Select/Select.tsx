import { ChangeEvent, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOptions {
    value: string
    content: string
}
interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOptions[]
    value?: string
    onChange?: (value: string) => void
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
    const {
        label, className, options, value, onChange, readonly,
    } = props
    const { t } = useTranslation()

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }
    const optionList = useMemo(() => options?.map((opt) => (
        <option
            value={opt.value}
            className={cls.option}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options])

    const cn = classNames(cls.Wrapper, {}, [className])

    return (
        <div className={cn}>
            {label && (
                <span className={cls.label}>{`${label}>`}</span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionList}
            </select>
        </div>
    );
});
