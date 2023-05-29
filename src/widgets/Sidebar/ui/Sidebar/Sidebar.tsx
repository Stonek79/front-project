import { ToggleComponentFeatures } from '@/shared/lib/features'
import { SidebarRedesigned } from '../SidebarRedesigned/SidebarRedesigned'
import { SidebarOriginal } from '../SidebarOriginal/SidebarOriginal'

interface SidebarProps {
    className?: string
}
export const Sidebar = (props: SidebarProps) => {
    const { className } = props

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<SidebarRedesigned className={className} />}
            off={<SidebarOriginal className={className} />}
        />
    )
}
