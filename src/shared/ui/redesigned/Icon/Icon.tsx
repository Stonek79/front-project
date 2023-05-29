import React, { memo, SVGProps } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface IconClickEnableProps extends IconBaseProps {
    clickable: true
    onClick: () => void
}

interface IconClickDisableProps extends IconBaseProps {
    clickable?: false
}

type IconProps = IconClickDisableProps | IconClickEnableProps

export const Icon = memo((props: IconProps) => {
    const {
        className,
        width = 32,
        height = 32,
        clickable,
        Svg,
        ...otherProps
    } = props

    const cn = classNames(cls.Icon, {}, [className])

    const svg = (
        <Svg
            height={height}
            width={width}
            className={cn}
            {...otherProps}
            onClick={undefined}
        />
    )

    if (clickable) {
        return (
            <button
                className={cls.clear}
                onClick={props.onClick}
                type="button"
                style={{ height, width }}
            >
                {svg}
            </button>
        )
    }

    return svg
})
