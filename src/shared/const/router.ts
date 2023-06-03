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
export const getRouteProfile = (id: string) => `/profile/${id}`
export const getRouteArticles = () => '/articles'
export const getRouteArticleDetail = (id: string) => `/articles/${id}`
export const getRouteArticleNew = () => '/articles/new'
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`
export const getRouteAdminPanel = () => '/admin'
export const getRouteForbidden = () => '/forbidden'
export const getRouteNotFound = () => '*'
