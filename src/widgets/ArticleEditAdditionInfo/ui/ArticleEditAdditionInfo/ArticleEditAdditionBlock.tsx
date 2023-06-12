import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditAdditionBlock.module.scss'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { User } from '@/entities/User'

interface ArticleEditAdditionBlockProps {
    className?: string
    author: User
    createdAt: string
    views: number
}

export const ArticleEditAdditionBlock = memo(
    (props: ArticleEditAdditionBlockProps) => {
        const { className, author, views, createdAt } = props
        const { t } = useTranslation()

        const cn = classNames(cls.ArticleEditAdditionInfo, {}, [className])

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const onCancelEdit = () => {}

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const onSave = () => {}

        return (
            <VStack gap="32" className={cn}>
                <HStack gap="8">
                    <Avatar src={author.avatar} size={32} />
                    <Text text={author.username} bold />
                    <Text text={createdAt} />
                </HStack>
                <Button variant="outline" color="error" onClick={onCancelEdit}>
                    {t('Cancel edit')}
                </Button>
                <Button variant="outline" color="success" onClick={onSave}>
                    {t('Save')}
                </Button>
                <Text text={t('{{count}} views', { count: views })} />
            </VStack>
        )
    },
)
