import { classNames } from '@/shared/lib/classNames/classNames'
import './Loader.scss'

interface LoaderProps {
    className?: string
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
)
