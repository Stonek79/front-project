import { CSSProperties, memo, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'
import { AppImage } from '../../redesigned/AppImage'
import { Skeleton } from '../Skeleton'
import { Icon } from '../Icon'
import UserAvatar from '../../../assets/icons/user-filled.svg'

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
}

export const Avatar = memo((props: AvatarProps) => {
    const { className, src, alt, size = 100 } = props

    const cn = classNames(cls.Avatar, {}, [className])

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    )

    const errorFallback = <Icon Svg={UserAvatar} width={size} height={size} />
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
