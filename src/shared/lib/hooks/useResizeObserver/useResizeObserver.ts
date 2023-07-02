import { MutableRefObject, useMemo, useState } from 'react'

interface useResizeObserverProps {
    element: MutableRefObject<HTMLElement>
    startWidth?: number
    startHeight?: number
}

export const useResizeObserver = ({
    element,
    startHeight = element.current.offsetHeight,
    startWidth = element.current.offsetWidth,
}: useResizeObserverProps) => {
    const [height, setHeight] = useState(startHeight)
    const [width, setWidth] = useState(startWidth)

    const resizeObserver = new ResizeObserver((entries) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const entry of entries) {
            if (entry.contentBoxSize[0].inlineSize !== width) {
                setWidth(entry.contentBoxSize[0].inlineSize)
            }

            if (entry.contentBoxSize[0].blockSize !== height) {
                setHeight(entry.contentBoxSize[0].blockSize)
            }
        }
    })

    resizeObserver.observe(element.current)

    return useMemo(() => ({ height, width }), [height, width])
}
