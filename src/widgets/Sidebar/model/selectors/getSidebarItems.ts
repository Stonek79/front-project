import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import MainPageIcon from '@/shared/assets/icons/main-page.svg'
import AboutPageIcon from '@/shared/assets/icons/about-page.svg'
import ProfilePageIcon from '@/shared/assets/icons/profile-page.svg'
import ArticlesIcon from '@/shared/assets/icons/articles.svg'

import { SidebarItemsType } from '../../model/types/sidebar'
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemsType[] = [
        {
            text: 'Main',
            path: getRouteMain(),
            Icon: MainPageIcon,
        },
        {
            text: 'About us',
            path: getRouteAbout(),
            Icon: AboutPageIcon,
        },
    ]
    if (userData) {
        sidebarItemsList.push(
            {
                text: 'Profile',
                path: getRouteProfile(userData.id),
                Icon: ProfilePageIcon,
                authOnly: true,
            },
            {
                text: 'Articles',
                path: getRouteArticles(),
                Icon: ArticlesIcon,
                authOnly: true,
            },
        )
    }
    return sidebarItemsList
})
