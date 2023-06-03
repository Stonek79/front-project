import React, { memo } from 'react'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleListItemDeprecated.module.scss'
import { ArticleView } from '../../model/consts/consts'
import { ArticleListItemSkeletonProps } from '../ArticleListItem/ArticleListItemSkeleton'

export const ArticleListItemSkeletonDeprecated = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props

        const cn = classNames('', {}, [className, cls[view]])

        if (view === ArticleView.LIST) {
            return (
                <CardDeprecated className={cn}>
                    <div className={cls.card}>
                        <div className={cls.header}>
                            <SkeletonDeprecated
                                width={30}
                                height={30}
                                border="50%"
                            />
                            <SkeletonDeprecated
                                width={150}
                                height={16}
                                className={cls.username}
                            />
                            <SkeletonDeprecated
                                width={150}
                                height={16}
                                className={cls.date}
                            />
                        </div>
                        <SkeletonDeprecated
                            width={150}
                            height={24}
                            className={cls.title}
                        />
                        <SkeletonDeprecated height={200} className={cls.img} />
                        <div className={cls.footer}>
                            <SkeletonDeprecated height={36} width={200} />
                        </div>
                    </div>
                </CardDeprecated>
            )
        }

        return (
            <CardDeprecated className={cn}>
                <div className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <SkeletonDeprecated
                            width={200}
                            height={200}
                            className={cls.img}
                        />
                    </div>
                    <div className={cls.infoWrapper}>
                        <SkeletonDeprecated width={110} height={16} />
                    </div>
                </div>
                <SkeletonDeprecated
                    width={130}
                    height={16}
                    className={cls.title}
                />
            </CardDeprecated>
        )
    },
)
