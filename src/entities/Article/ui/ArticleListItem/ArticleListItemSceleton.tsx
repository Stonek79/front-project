import React, { memo } from 'react'
import { Card } from '@/shared/ui/deprecated/Card'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import { ArticleView } from '../../model/consts/consts'
import { ArticleViewTypes } from '../../model/types/article'

interface ArticleListItemSkeletonProps {
    className?: string
    view: ArticleViewTypes
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props

        const cn = classNames('', {}, [className, cls[view]])

        if (view === ArticleView.LIST) {
            return (
                <Card className={cn}>
                    <div className={cls.card}>
                        <div className={cls.header}>
                            <Skeleton width={30} height={30} border="50%" />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.username}
                            />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.date}
                            />
                        </div>
                        <Skeleton
                            width={150}
                            height={24}
                            className={cls.title}
                        />
                        <Skeleton height={200} className={cls.img} />
                        <div className={cls.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </div>
                </Card>
            )
        }

        return (
            <Card className={cn}>
                <div className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <Skeleton
                            width={200}
                            height={200}
                            className={cls.img}
                        />
                    </div>
                    <div className={cls.infoWrapper}>
                        <Skeleton width={110} height={16} />
                    </div>
                </div>
                <Skeleton width={130} height={16} className={cls.title} />
            </Card>
        )
    },
)
