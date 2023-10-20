import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PageLoader.module.scss'
import { Loader } from '@/shared/ui/redesigned/Loader'

interface PageLoaderProps {
    className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
)
