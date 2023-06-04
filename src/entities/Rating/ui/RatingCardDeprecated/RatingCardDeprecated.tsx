import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import cls from './RatingCardDeprecated.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { RatingCardProps } from '../RatingCard/RatingCard'
import { StarRating } from '@/shared/ui/redesigned/StarRating'

export const RatingCardDeprecated = memo((props: RatingCardProps) => {
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
            <TextDeprecated title={feedbackTitle} />
            <InputDeprecated
                data-testid="RatingCard.Input"
                placeholder={t('Your feedback')}
                value={feedback}
                onChange={setFeedback}
            />
        </>
    )

    const cn = classNames(cls.RatingCard, {}, [className])

    return (
        <CardDeprecated
            data-testid="RatingCard"
            theme={CardTheme.NORMAL}
            className={cn}
            max
        >
            <VStack align="center" gap="8" max>
                <TextDeprecated
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
                            <ButtonDeprecated
                                data-testid="RatingCard.Cancel"
                                onClick={cancelHandler}
                                theme={ButtonTheme.OUTLINE_RED}
                            >
                                {t('Cancel')}
                            </ButtonDeprecated>
                            <ButtonDeprecated
                                data-testid="RatingCard.Send"
                                onClick={acceptHandler}
                            >
                                {t('Send')}
                            </ButtonDeprecated>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer lazy onClose={cancelHandler} isOpen={isModalOpened}>
                    <VStack gap="32">
                        {rating}
                        <ButtonDeprecated fullWidth onClick={acceptHandler}>
                            {t('Send')}
                        </ButtonDeprecated>
                    </VStack>
                </Drawer>
            </MobileView>
        </CardDeprecated>
    )
})
