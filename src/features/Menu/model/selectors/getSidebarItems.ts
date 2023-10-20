import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'

import MainPageIcon from '@/shared/assets/icons/home.svg'
import AboutPageIcon from '@/shared/assets/icons/Info.svg'
import ProfilePageIcon from '@/shared/assets/icons/avatar.svg'
import ArticlesIcon from '@/shared/assets/icons/article.svg'
import ContactsIcon from '@/shared/assets/icons/contacts.svg'

import { SidebarItemsType } from '../types/sidebar'
import {
    getRouteAbout,
    getRouteArticles,
    getRouteContacts,
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
        {
            text: 'Contacts',
            path: getRouteContacts(),
            Icon: ContactsIcon,
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
