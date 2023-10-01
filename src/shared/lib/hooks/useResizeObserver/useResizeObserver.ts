import { MutableRefObject, useMemo, useState } from 'react'

interface useResizeObserverProps {
    element: MutableRefObject<HTMLElement | undefined>
    startWidth?: number
    startHeight?: number
}

export const useResizeObserver = ({
    element,
    startHeight = element?.current?.offsetHeight || 0,
    startWidth = element?.current?.offsetWidth || 0,
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

    if (element?.current) resizeObserver.observe(element.current)

    return useMemo(() => ({ height, width }), [height, width])
}
