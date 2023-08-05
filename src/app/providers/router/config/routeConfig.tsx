import { MainPage } from '@/pages/MainPage'
import { AboutPage } from '@/pages/AboutPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ArticleDetailPage } from '@/pages/ArticleDetalePage'
import { ArticleEditPage } from '@/pages/ArticleEditPage'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { UserRoles } from '@/entities/User'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdminPanel,
    getRouteArticleDetail,
    getRouteArticleEdit,
    getRouteArticleNew,
    getRouteArticles,
    getRouteContacts,
    getRouteForbidden,
    getRouteMain,
    getRouteNotFound,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/const/router'
import { AppRoutesProps } from '@/shared/types/router'
import { SettingsPage } from '@/pages/SettingsPage'
import { ArticleNewPage } from '@/pages/ArticleNewPage'
import { ContactsPage } from '@/pages/ContactsPage'

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetail(':id'),
        element: <ArticleDetailPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_NEW]: {
        path: getRouteArticleNew(),
        element: <ArticleNewPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRoles.ADMIN, UserRoles.MANAGER],
    },
    [AppRoutes.CONTACTS]: {
        path: getRouteContacts(),
        element: <ContactsPage />,
        authOnly: true,
        roles: [UserRoles.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
    },
}
