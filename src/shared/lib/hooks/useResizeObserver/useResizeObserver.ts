import { MutableRefObject, useEffect } from 'react'
// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import { ArticleView } from '@/entities/Article'

interface useResizeObserverProps {
    page: number
    // initState: (limit: number) => void,
    // fetchArticles: (page: number) => void,
    view: string
    element: MutableRefObject<HTMLElement>
}

export const useResizeObserver = ({
    page,
    view,
    element,
}: useResizeObserverProps) => {
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    const heightLimit = Math.floor(
                        entry.contentBoxSize[0].blockSize / 325,
                    ) // hardcoded height
                    const widthLimit = Math.floor(
                        entry.contentBoxSize[0].inlineSize / 260,
                    ) // hardcoded width
                    const limit =
                        view === ArticleView.LIST
                            ? 3
                            : (heightLimit + 1) * widthLimit
                    // initState(limit)
                    // fetchArticles(page)
                    console.log(limit, 'limit')
                } else {
                    resizeObserver.unobserve(element.current)
                    console.log(' ResizeObserverEntry error')
                }
            }
            resizeObserver.unobserve(element.current)
            console.log('Size changed')
        })

        resizeObserver.observe(element.current)
    }, [element, page, view])
}
