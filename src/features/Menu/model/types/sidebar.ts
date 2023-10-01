import React from 'react'

export interface SidebarItemsType {
    text?: string
    path: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean
}
