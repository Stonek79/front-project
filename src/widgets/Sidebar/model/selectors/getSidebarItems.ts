import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainPageIcon from 'shared/assets/icons/main-page.svg'
import AboutPageIcon from 'shared/assets/icons/about-page.svg'
import ProfilePageIcon from 'shared/assets/icons/profile-page.svg'
import ArticlesIcon from 'shared/assets/icons/articles.svg'

import { SidebarItemsType } from '../../model/types/sidebar'

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemsType[] = [
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

        ]
        if (userData) {
            sidebarItemsList.push(
                {
                    text: 'Profile',
                    path: RoutePath.profile + userData.id,
                    Icon: ProfilePageIcon,
                    authOnly: true,
                },
                {
                    text: 'Articles',
                    path: RoutePath.articles,
                    Icon: ArticlesIcon,
                    authOnly: true,
                },
            )
        }
        return sidebarItemsList
    },
)
