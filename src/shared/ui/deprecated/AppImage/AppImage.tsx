import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    fallback?: ReactElement
    errorFallback?: ReactElement
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        errorFallback,
        fallback,
        ...otherProps
    } = props
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
        const img = new Image()
        img.src = src ?? ''
        img.onload = () => {
            setIsLoading(false)
        }
        img.onerror = () => {
            setIsLoading(false)
            setHasError(true)
        }
    }, [src])

    if (isLoading && fallback) {
        return fallback
    }

    if (hasError && errorFallback) {
        return errorFallback
    }

    return <img className={className} src={src} alt={alt} {...otherProps} />
})
