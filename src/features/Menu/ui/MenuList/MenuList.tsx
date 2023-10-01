import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItemRedesigned } from '../SidebarItemRedesigned/SidebarItemRedesigned'
import { VStack } from '@/shared/ui/redesigned/Stack'

interface MenuListProps {
    collapsed?: boolean
    className?: string
    onClick?: () => void
}

export const MenuList = memo((props: MenuListProps) => {
    const { collapsed = false, className, onClick } = props
    const sidebarItemsList = useSelector(getSidebarItems)

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItemRedesigned
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemsList],
    )

    return (
        <VStack
            onClick={onClick}
            className={className}
            role="navigation"
            gap="8"
        >
            {itemsList}
        </VStack>
    )
})
