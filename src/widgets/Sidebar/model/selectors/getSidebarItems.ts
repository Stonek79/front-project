import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import MainPageIconDeprecated from '@/shared/assets/icons/main-page.svg'
import AboutPageIconDeprecated from '@/shared/assets/icons/about-page.svg'
import ProfilePageIconDeprecated from '@/shared/assets/icons/profile-page.svg'
import ArticlesIconDeprecated from '@/shared/assets/icons/articles.svg'

import MainPageIcon from '@/shared/assets/icons/home.svg'
import AboutPageIcon from '@/shared/assets/icons/Info.svg'
import ProfilePageIcon from '@/shared/assets/icons/avatar.svg'
import ArticlesIcon from '@/shared/assets/icons/article.svg'

import { SidebarItemsType } from '../../model/types/sidebar'
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router'
import { toggleFeatures } from '@/shared/lib/features'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemsType[] = [
        {
            text: 'Main',
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                on: () => MainPageIcon,
                off: () => MainPageIconDeprecated,
            }),
        },
        {
            text: 'About us',
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                on: () => AboutPageIcon,
                off: () => AboutPageIconDeprecated,
            }),
        },
    ]
    if (userData) {
        sidebarItemsList.push(
            {
                text: 'Profile',
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => ProfilePageIcon,
                    off: () => ProfilePageIconDeprecated,
                }),
                authOnly: true,
            },
            {
                text: 'Articles',
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => ArticlesIcon,
                    off: () => ArticlesIconDeprecated,
                }),
                authOnly: true,
            },
        )
    }
    return sidebarItemsList
})
