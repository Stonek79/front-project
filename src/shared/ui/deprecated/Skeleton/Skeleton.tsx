import { CSSProperties, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
    className?: string
    height?: string | number
    width?: string | number
    border?: string
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const Skeleton = memo((props: SkeletonProps) => {
    const { className, border, height, width } = props

    const cn = classNames(cls.Skeleton, {}, [className])

    const styles: CSSProperties = {
        height,
        width,
        borderRadius: border,
    }
    return <div style={styles} className={cn} />
})
