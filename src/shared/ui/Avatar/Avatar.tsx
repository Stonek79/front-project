import { CSSProperties, memo, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import { AppImage } from '../AppImage'
import { Skeleton } from '../Skeleton'
import { Icon } from '../Icon'
import UserAvatar from '../../assets/icons/user-filled.svg'

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
    fallbackInverted?: boolean
}

export const Avatar = memo((props: AvatarProps) => {
    const { className, src, alt, fallbackInverted, size = 100 } = props

    const cn = classNames(cls.Avatar, {}, [className])

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    )

    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            Svg={UserAvatar}
            width={size}
            height={size}
        />
    )
    const fallback = <Skeleton width={size} height={size} border="50%" />

    return (
        <AppImage
            errorFallback={errorFallback}
            fallback={fallback}
            src={src}
            alt={alt}
            style={styles}
            className={cn}
        />
    )
})
