import React, { memo, SVGProps } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
    active?: boolean
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
        active,
        Svg,
        ...otherProps
    } = props

    const cn = classNames(cls.Icon, { [cls.inactive]: active }, [
        cls.clear,
        className,
    ])
    const iconCn = classNames(cls.Icon, { [cls.inactive]: active }, [className])

    const svg = (
        <Svg
            height={height}
            width={width}
            className={iconCn}
            {...otherProps}
            onClick={undefined}
        />
    )

    if (clickable) {
        return (
            <button
                className={cn}
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
