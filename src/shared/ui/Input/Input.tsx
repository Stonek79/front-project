import {
    ChangeEvent, InputHTMLAttributes, memo, MutableRefObject, SyntheticEvent, useEffect, useRef, useState,
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    placeholder?: string
    value?: string
    type?: string
    autofocus?: boolean
    onChange?: (value: string) => void
    isOpenModal?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        type = 'text', value, onChange, className, placeholder, autofocus, isOpenModal, ...otheProps
    } = props

    const [isFocused, setIsFocused] = useState(false)
    const [sliderPosition, setSliderPosition] = useState(0)
    const ref = useRef() as MutableRefObject<HTMLInputElement>

    const cn = classNames(cls.Input, {}, [className])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
        setSliderPosition(e?.target?.value?.length)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onSelect = (e: SyntheticEvent<HTMLInputElement, Event>) => {
        setSliderPosition(e?.currentTarget?.selectionStart || 0)
    }

    useEffect(() => {
        if (autofocus || isOpenModal) {
            setIsFocused(true)
            ref.current.focus()
        }
    }, [autofocus, isOpenModal])

    // TODO Fix bug with slider when delete inside text
    return (
        <div className={cn}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={cls.sliderWrapper}>
                <input
                    ref={ref}
                    className={cls.input}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    {...otheProps}
                />
                {isFocused && (
                    <span
                        className={cls.slider}
                        style={{ left: `${sliderPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    )
})
