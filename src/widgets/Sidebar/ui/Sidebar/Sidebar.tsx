import { SidebarRedesigned } from '../SidebarRedesigned/SidebarRedesigned'

interface SidebarProps {
    className?: string
}
export const Sidebar = (props: SidebarProps) => {
    const { className } = props

    return <SidebarRedesigned className={className} />
}
