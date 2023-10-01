import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLogo.module.scss'
import MyLogo from '@/shared/assets/icons/my-logo.svg'
import { HStack } from '../Stack'

interface AppLogoProps {
    className?: string
    size?: number
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className, size = 50 } = props

    const cn = classNames(cls.AppLogo, {}, [className])

    return (
        <HStack max justify="center" className={cn}>
            <MyLogo
                className={cls.logo}
                width={size}
                height={size}
                color="black"
            />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    )
})
