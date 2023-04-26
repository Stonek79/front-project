import { CSSProperties, memo, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string;
    src?: string
    alt?: string
    size?: number
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className, src, alt, size,
    } = props

    const cn = classNames(cls.Avatar, {}, [className])

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size])

    return (
        <img
            src={src}
            alt={alt}
            style={styles}
            className={cn}
        />
    );
});
