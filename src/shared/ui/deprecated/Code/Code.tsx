import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '../Button/Button'
import CopyIcon from '../../../assets/icons/copy-article.svg'
import cls from './Code.module.scss'

interface CodeProps {
    className?: string
    text: string
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const Code = memo((props: CodeProps) => {
    const { className, text } = props

    const cn = classNames(cls.Code, {}, [className])

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={cn}>
            <Button
                onClick={onCopy}
                theme={ButtonTheme.CLEAR}
                className={cls.copyBtn}
            >
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    )
})
