import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'
import { Card, CardTheme } from '@/shared/ui/deprecated/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/deprecated/Text'
import { StarRating } from '@/shared/ui/deprecated/StarRating'
import { Modal } from '@/shared/ui/deprecated/Modal'
import { Input } from '@/shared/ui/deprecated/Input'
import { Drawer } from '@/shared/ui/deprecated/Drawer'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import cls from './RatingCard.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
    starRate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        starRate = 0,
    } = props
    const { t } = useTranslation()
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [starsCount, setStarsCount] = useState(starRate)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount)
            if (hasFeedback) {
                setIsModalOpened(true)
            } else {
                onAccept?.(selectedStarsCount)
            }
        },
        [hasFeedback, onAccept],
    )

    const acceptHandler = useCallback(() => {
        onAccept?.(starsCount, feedback)
        setIsModalOpened(false)
    }, [feedback, onAccept, starsCount])

    const cancelHandler = useCallback(() => {
        onCancel?.(starsCount)
        setIsModalOpened(false)
    }, [onCancel, starsCount])

    const rating = (
        <>
            <Text title={feedbackTitle} />
            <Input
                data-testid="RatingCard.Input"
                placeholder={t('Your feedback')}
                value={feedback}
                onChange={setFeedback}
            />
        </>
    )

    const cn = classNames(cls.RatingCard, {}, [className])

    return (
        <Card
            data-testid="RatingCard"
            theme={CardTheme.NORMAL}
            className={cn}
            max
        >
            <VStack align="center" gap="8" max>
                <Text
                    title={starsCount ? t('Thanks for the rating!') : title}
                />
                <StarRating
                    selectedStars={starsCount}
                    size={40}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpened} lazy>
                    <VStack max gap="32">
                        {rating}
                        <HStack gap="16" max justify="between">
                            <Button
                                data-testid="RatingCard.Cancel"
                                onClick={cancelHandler}
                                theme={ButtonTheme.OUTLINE_RED}
                            >
                                {t('Cancel')}
                            </Button>
                            <Button
                                data-testid="RatingCard.Send"
                                onClick={acceptHandler}
                            >
                                {t('Send')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer lazy onClose={cancelHandler} isOpen={isModalOpened}>
                    <VStack gap="32">
                        {rating}
                        <Button fullWidth onClick={acceptHandler}>
                            {t('Send')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    )
})
