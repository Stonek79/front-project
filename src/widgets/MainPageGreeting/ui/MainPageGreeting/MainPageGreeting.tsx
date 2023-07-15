import { useEffect, useRef, useState } from 'react'
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
    maxWidth,
    mLetter,
    nameArray,
} from '../../model/consts/consts'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text, TextSize } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { useResizeObserver } from '@/shared/lib/hooks/useResizeObserver/useResizeObserver'
import { AppRoutes } from '@/shared/const/router'

interface MainPageGreetingProps {
    className?: string
}

export const MainPageGreeting = ({ className }: MainPageGreetingProps) => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const sizeRef = useRef(document.body)
    const { width } = useResizeObserver({ element: sizeRef })

    const [size, setSize] = useState<TextSize>(width >= maxWidth ? 'm' : 's')

    const { t } = useTranslation()
    const cn = classNames('', {}, [className, cls['home-page']])

    if (size === 'm' && width < maxWidth) {
        setSize('s')
    }

    if (size === 's' && width >= maxWidth) {
        setSize('m')
    }

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
                <VStack className={cls['text-zone']}>
                    <HStack className={cls.letters}>
                        <span className={cls[letterClass]}>{HLetter}</span>
                        <span className={`${cls[letterClass]} _12`}>
                            {iLetter}
                        </span>
                    </HStack>
                    <HStack className={cls.letters}>
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
                    <HStack className={cls.letters}>
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
                    <HStack className={cls.letters}>
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
                {/* TODO add contact page */}
                <HStack justify="between" max>
                    <Button className={cls['flat-button']}>
                        <AppLink to="/contact">{t('Contact me')}</AppLink>
                    </Button>
                    <Button className={cls['flat-button']}>
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
