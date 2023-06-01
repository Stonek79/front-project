import {
    ChangeEvent,
    InputHTMLAttributes,
    memo,
    MutableRefObject,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>

interface InputProps extends HTMLInputProps {
    className?: string
    placeholder?: string
    value?: string | number
    type?: string
    autofocus?: boolean
    onChange?: (value: string) => void
    isOpenModal?: boolean
    readonly?: boolean
    addonLeft?: ReactElement
    addonRight?: ReactElement
}

export const Input = memo((props: InputProps) => {
    const {
        type = 'text',
        value,
        onChange,
        className,
        placeholder,
        autofocus,
        readonly,
        isOpenModal,
        addonLeft,
        addonRight,
        ...otherProps
    } = props

    const [isFocused, setIsFocused] = useState(false)
    const ref = useRef() as MutableRefObject<HTMLInputElement>

    const mode: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    }
    const cn = classNames(cls.Input, mode, [className])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    useEffect(() => {
        if (autofocus || isOpenModal) {
            setIsFocused(true)
            ref.current.focus()
        }
    }, [autofocus, isOpenModal])

    return (
        <div className={cn}>
            <div className={cls.addonLeft}>{addonLeft}</div>
            <input
                ref={ref}
                className={cls.input}
                type={type}
                value={value}
                onChange={onChangeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            <div className={cls.addonRight}>{addonRight}</div>
        </div>
    )
})
