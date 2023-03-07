import React from 'react'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainPageIcon from 'shared/assets/icons/main-page.svg'
import AboutPageIcon from 'shared/assets/icons/about-page.svg'
import ProfilePageIcon from 'shared/assets/icons/profile-page.svg'

export interface SidebarItemsType {
    text?: string
    path: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}
export const SidebarItemsList: SidebarItemsType[] = [
    {
        text: 'Main',
        path: RoutePath.main,
        Icon: MainPageIcon,
    },
    {
        text: 'About us',
        path: RoutePath.about,
        Icon: AboutPageIcon,
    },
    {
        text: 'Profile',
        path: RoutePath.profile,
        Icon: ProfilePageIcon,
    },
]
