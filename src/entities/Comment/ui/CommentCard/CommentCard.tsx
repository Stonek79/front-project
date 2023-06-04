import { memo } from 'react'
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton'
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'
import { getRouteProfile } from '@/shared/const/router'
import { ToggleComponentFeatures, toggleFeatures } from '@/shared/lib/features'
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

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    })

    if (isLoading || !comment) {
        return (
            <VStack max className={cn}>
                <HStack>
                    <Skeleton height={30} width={30} border="50%" />
                    <Skeleton height={20} width={90} />
                </HStack>
                <Skeleton height={60} width="100%" />
            </VStack>
        )
    }

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
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
            }
            off={
                <VStack
                    data-testid="CommentCard.Content"
                    gap="8"
                    max
                    className={cn}
                >
                    <AppLinkDeprecated to={getRouteProfile(comment.user.id)}>
                        <HStack gap="8">
                            {comment.user.avatar && (
                                <AvatarDeprecated
                                    size={30}
                                    alt={comment.user.username}
                                    src={comment?.user.avatar}
                                />
                            )}
                            <TextDeprecated title={comment.user.username} />
                        </HStack>
                    </AppLinkDeprecated>
                    <TextDeprecated text={comment.text} />
                </VStack>
            }
        />
    )
})
