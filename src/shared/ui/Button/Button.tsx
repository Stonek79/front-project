import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react'
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    SECONDARY = 'secondary'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string
    theme?: ButtonTheme
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        children, className, onClick, theme = ButtonTheme.CLEAR, ...otherProps
    } = props
    const cn = classNames(cls.Button, [className, cls[theme]])

    return (
        <button type="button" className={cn} onClick={onClick} {...otherProps}>
            {children}
        </button>
    );
};
