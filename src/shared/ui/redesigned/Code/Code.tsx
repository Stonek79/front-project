import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'

import NewCopyIcon from '../../../assets/icons/copy.svg'
import cls from './Code.module.scss'
import { Icon } from '../Icon'

interface CodeProps {
    className?: string
    text: string
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props

    const cn = classNames(cls.CodeRedesigned, {}, [className])

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={cn}>
            <Icon
                clickable
                onClick={onCopy}
                Svg={NewCopyIcon}
                className={cls.copyBtn}
            />
            <code>{text}</code>
        </pre>
    )
})
