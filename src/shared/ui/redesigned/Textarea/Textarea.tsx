import {
    ChangeEvent,
    InputHTMLAttributes,
    memo,
    MutableRefObject,
    useEffect,
    useRef,
    useState,
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Textarea.module.scss'
import { HStack, VStack } from '../Stack'
import { Text } from '../Text'
import { Card } from '../Card'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'
>

type Direction = 'vertical' | 'horizontal'

interface InputProps extends HTMLInputProps {
    textareaId: string
    direction?: Direction
    className?: string
    placeholder?: string
    value?: string | number
    label?: string
    autofocus?: boolean
    onChange?: (value: string) => void
    isOpenModal?: boolean
    readonly?: boolean
    wrap?: boolean
    labelBold?: boolean
}

export const Textarea = memo((props: InputProps) => {
    const {
        direction = 'vertical',
        textareaId,
        value,
        label,
        onChange,
        placeholder,
        autofocus,
        readonly,
        isOpenModal,
        wrap = false,
        labelBold = false,
        ...otherProps
    } = props
    const [height, setHeight] = useState(0)
    const [isFocused, setIsFocused] = useState(false)
    const ref = useRef() as MutableRefObject<HTMLTextAreaElement>

    useEffect(() => {
        const currentHeight = ref?.current?.scrollHeight

        if (Boolean(currentHeight) && currentHeight !== height) {
            setHeight(currentHeight)
        }
    }, [height, textareaId, ref?.current?.scrollHeight])

    const inputCn = classNames(cls.input, { [cls.focused]: isFocused }, [])

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        <Card className={cls.container} cardPaddings="4" max>
            <textarea
                style={{ height }}
                id={textareaId}
                aria-multiline
                ref={ref}
                className={inputCn}
                value={value}
                onChange={onChangeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
        </Card>
    )

    if (label) {
        return direction === 'vertical' ? (
            <HStack gap="8" max>
                <Text
                    className={wrap ? cls.wrap : ''}
                    bold={labelBold}
                    text={label}
                />
                {input}
            </HStack>
        ) : (
            <VStack gap="8" max>
                <Text
                    className={wrap ? cls.wrap : ''}
                    bold={labelBold}
                    text={label}
                />
                {input}
            </VStack>
        )
    }

    return input
})
