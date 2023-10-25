import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MyLogoTitle from '@/shared/assets/my-logo.png'
import cls from './MainPageGreeting.module.scss'
import { MainLogo } from '@/features/MainLogo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AnimatedLetters } from '@/features/AnimatedLetters'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import {
    footerSign,
    HLetter,
    ILetter,
    iLetter,
    jobArray,
    jobArray2,
    jobArray3,
    mLetter,
    nameArray,
} from '../../model/consts/consts'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { AppRoutes } from '@/shared/const/router'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface MainPageGreetingProps {
    className?: string
}

export const MainPageGreeting = ({ className }: MainPageGreetingProps) => {
    const { t } = useTranslation()
    const [letterClass, setLetterClass] = useState('text-animate')
    const { isScreenSm } = useResize()

    const size = isScreenSm ? 'm' : 's'

    const cn = classNames('', { [cls.mobile]: !isScreenSm }, [
        className,
        cls['home-page'],
    ])
    const cnLetters = classNames('', { [cls.mobile]: !isScreenSm }, [
        cls.letters,
    ])
    const cnTextZone = classNames('', { [cls.mobile]: !isScreenSm }, [
        cls['text-zone'],
    ])

    useEffect(() => {
        const timer = setTimeout(
            () => setLetterClass('text-animate-hover'),
            6000,
        )
        return () => clearTimeout(timer)
    }, [])

    return (
        <VStack className={cn}>
            <VStack gap="8">
                <Text
                    className={cls.tags}
                    cursive
                    self="start"
                    variant="tag"
                    title="<h1>"
                    align="right"
                />
                <VStack className={cnTextZone}>
                    <HStack className={cnLetters}>
                        <span className={cls[letterClass]}>{HLetter}</span>
                        <span className={`${cls[letterClass]} _12`}>
                            {iLetter}
                        </span>
                    </HStack>
                    <HStack className={cnLetters}>
                        <span className={`${cls[letterClass]} _13`}>
                            {ILetter}
                        </span>
                        <span className={`${cls[letterClass]} _14`}>
                            {mLetter}
                        </span>
                        <img
                            className={cls.img}
                            src={MyLogoTitle}
                            alt="Web Developer Name"
                        />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={nameArray}
                            index={15}
                        />
                    </HStack>
                    <HStack className={cnLetters}>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray}
                            index={23}
                        />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray2}
                            index={28}
                        />
                    </HStack>
                    <HStack className={cnLetters}>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray3}
                            index={38}
                        />
                    </HStack>
                </VStack>
                <Text
                    className={cls.tags}
                    cursive
                    variant="tag"
                    title="<h1 />"
                />
                <Text
                    size={size}
                    className={cls.footerSign}
                    title={footerSign}
                />
                <HStack justify="between" max>
                    <Button size={size} className={cls['flat-button']}>
                        <AppLink to="/contacts">{t('Contact me')}</AppLink>
                    </Button>
                    <Button size={size} className={cls['flat-button']}>
                        <AppLink to={AppRoutes.ABOUT}>
                            {t('About Page')}
                        </AppLink>
                    </Button>
                </HStack>
            </VStack>
            <MainLogo />
        </VStack>
    )
}
