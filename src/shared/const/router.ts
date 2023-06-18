export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    SETTINGS = 'settings',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_NEW = 'article_new',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden_page',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/'
export const getRouteSettings = () => '/settings'
export const getRouteAbout = () => '/about'
export const getRouteProfile = (userId: string) => `/profile/${userId}`
export const getRouteArticles = () => '/articles'
export const getRouteArticleDetail = (id: string) => `/articles/${id}`
export const getRouteArticleNew = () => '/articles/new'
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`
export const getRouteAdminPanel = () => '/admin'
export const getRouteForbidden = () => '/forbidden'

export const getRouteNotFound = () => '*'

export const AppRouterByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':userId')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetail(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleNew()]: AppRoutes.ARTICLE_NEW,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdminPanel()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
}
