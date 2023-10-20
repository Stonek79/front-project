import { NavbarRedesigned } from './NavbarRedesigned/NavbarRedesigned'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props

    return <NavbarRedesigned className={className} />
}
