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
import { HStack } from '../Stack'
import { Text } from '../Text'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>

type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
    className?: string
    placeholder?: string
    value?: string | number
    label?: string
    type?: string
    size?: InputSize
    autofocus?: boolean
    onChange?: (value: string) => void
    isOpenModal?: boolean
    readonly?: boolean
    addonLeft?: ReactElement
    addonRight?: ReactElement
    wrap?: boolean
    labelBold?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        type = 'text',
        value,
        label,
        onChange,
        className,
        placeholder,
        autofocus,
        readonly,
        isOpenModal,
        addonLeft,
        addonRight,
        size = 'm',
        wrap = false,
        labelBold = false,
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
    const cn = classNames(cls.Input, mode, [className, cls[size]])

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

    const input = (
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

    if (label) {
        return (
            <HStack gap="8" max>
                <Text
                    className={wrap ? cls.wrap : ''}
                    bold={labelBold}
                    text={label}
                />
                {input}
            </HStack>
        )
    }

    return input
})
