import { ToggleComponentFeatures } from '@/shared/lib/features'
import { NavbarRedesigned } from './NavbarRedesigned/NavbarRedesigned'
import { NavbarOriginal } from './NavbarOriginal/NavbarOriginal'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<NavbarRedesigned className={className} />}
            off={<NavbarOriginal className={className} />}
        />
    )
}
