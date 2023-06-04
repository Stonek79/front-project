import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    Button as ButtonDeprecateed,
    ButtonTheme,
} from '../../deprecated/Button/Button'
import CopyIcon from '../../../assets/icons/copy-article.svg'
import NewCopyIcon from '../../../assets/icons/copy.svg'
import cls from './Code.module.scss'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Icon } from '../Icon'

interface CodeProps {
    className?: string
    text: string
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props

    const cn = classNames(cls.Code, {}, [className])
    const cnRedesigned = classNames(cls.CodeRedesigned, {}, [className])

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <pre className={cnRedesigned}>
                    <Icon
                        clickable
                        onClick={onCopy}
                        Svg={NewCopyIcon}
                        className={cls.copyBtn}
                    />
                    <code>{text}</code>
                </pre>
            }
            off={
                <pre className={cn}>
                    <ButtonDeprecateed
                        onClick={onCopy}
                        theme={ButtonTheme.CLEAR}
                        className={cls.copyBtn}
                    >
                        <CopyIcon className={cls.copyIcon} />
                    </ButtonDeprecateed>
                    <code>{text}</code>
                </pre>
            }
        />
    )
})
