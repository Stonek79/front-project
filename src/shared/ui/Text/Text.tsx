import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import cls from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

interface TextProps {
    className?: string;
    text?: string
    title?: string
    theme?: TextTheme
}

export const Text = memo((props: TextProps) => {
    const {
        className, text, title, theme = TextTheme.PRIMARY,
    } = props

    const cn = classNames('', {}, [className, cls[theme]])

    return (
        <div className={cn}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
