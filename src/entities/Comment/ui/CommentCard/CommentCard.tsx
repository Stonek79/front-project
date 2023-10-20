import { memo } from 'react'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text } from '@/shared/ui/redesigned/Text'
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'
import { getRouteProfile } from '@/shared/const/router'
import { Card } from '@/shared/ui/redesigned/Card'

interface CommentCardProps {
    className?: string
    comment?: Comment
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props

    const cn = classNames(cls.CommentCard, { [cls.loading]: isLoading }, [
        className,
    ])

    const Skeleton = SkeletonRedesigned

    if (isLoading || !comment) {
        return (
            <HStack gap="16" max className={cn}>
                <VStack align="center" gap="8">
                    <Skeleton height={30} width={30} border="50%" />
                    <Skeleton height={20} width={60} />
                </VStack>
                <VStack gap="8" max>
                    <Skeleton height={16} width="100%" />
                    <Skeleton height={16} width="90%" />
                    <Skeleton height={16} width="85%" />
                </VStack>
            </HStack>
        )
    }

    return (
        <Card cardPaddings="24" cardBorder="standard" max>
            <HStack
                data-testid="CommentCard.Content"
                gap="8"
                max
                className={className}
            >
                <AppLink to={getRouteProfile(comment.user.id)}>
                    <VStack gap="8">
                        {comment.user.avatar && (
                            <Avatar
                                size={30}
                                alt={comment.user.username}
                                src={comment?.user.avatar}
                            />
                        )}
                        <Text bold text={comment.user.username} />
                    </VStack>
                </AppLink>
                <Text self="start" text={comment.text} />
            </HStack>
        </Card>
    )
})
