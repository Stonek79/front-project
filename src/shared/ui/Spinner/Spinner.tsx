import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Spinner.module.scss'

interface SpinnerProps {
    className?: string;
}

export const Spinner: FC<SpinnerProps> = (props) => {
    const { className } = props
    const cn = classNames(cls.Spinner, [className])

    return (
        <div className={cn} />
    );
};
