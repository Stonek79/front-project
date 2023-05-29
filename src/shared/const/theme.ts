export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    LILAC = 'app_lilac_theme',
    ORANGE = 'app_orange_theme',
}

export const themes = {
    [Theme.DARK]: Theme.LIGHT,
    [Theme.LIGHT]: Theme.LILAC,
    [Theme.LILAC]: Theme.DARK,
    [Theme.ORANGE]: Theme.ORANGE,
}
