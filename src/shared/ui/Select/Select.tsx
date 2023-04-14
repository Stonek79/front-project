import { ChangeEvent, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface SelectOptions<T extends string> {
    value: T
    content: string
}
interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOptions<T>[]
    value?: T
    onChange?: (value: T) => void
    readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        label, className, options, value, onChange, readonly,
    } = props

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T)
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
}
