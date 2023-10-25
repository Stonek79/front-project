import React, { memo } from 'react'
import { ArticleViewTypes } from '../../model/types/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import { ArticleView } from '../../model/consts/consts'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

export interface ArticleListItemSkeletonProps {
    className?: string
    view: ArticleViewTypes
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props

        const cn = classNames('', {}, [className, cls[view]])
        if (view === ArticleView.LIST) {
            return (
                <Card className={cn} cardPaddings="24">
                    <VStack max gap="16">
                        <HStack gap="8">
                            <Skeleton width={30} height={30} border="50%" />
                            <Skeleton width={50} height={16} />
                            <Skeleton width={50} height={16} />
                        </HStack>
                        <Skeleton width={150} height={24} />
                        <Skeleton
                            width={150}
                            height={24}
                            className={cls.title}
                        />
                        <Skeleton height={420} className={cls.img} />
                        <Skeleton height={72} />
                        <HStack justify="between" max>
                            <Skeleton height={36} width={120} />
                            <Skeleton height={36} width={100} />
                        </HStack>
                    </VStack>
                </Card>
            )
        }

        return (
            <Card className={cn} cardBorder="standard">
                <Skeleton className={cls.img} />
                <VStack className={cls.info} gap="4" max>
                    <Skeleton height={16} />
                    <Skeleton height={16} />
                    <Skeleton height={16} width="90%" />
                    <Skeleton height={16} width="80%" />
                </VStack>
                <VStack className={cls.info} gap="4">
                    <HStack justify="between" max>
                        <Skeleton height={16} width={100} />
                        <Skeleton height={16} width={100} />
                    </HStack>
                    <HStack gap="4" max>
                        <Skeleton height={24} width={24} border="50%" />
                        <Skeleton height={16} width={100} />
                    </HStack>
                </VStack>
            </Card>
        )
    },
)
