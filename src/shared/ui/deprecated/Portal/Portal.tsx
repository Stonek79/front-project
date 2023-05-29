import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
    container?: Element
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const Portal: FC<PortalProps> = (props) => {
    const { children, container = document.body } = props

    return createPortal(children, container)
}
