import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MyLogoTitle from '@/shared/assets/my-logo.png'
import cls from './MainPageGreating.module.scss'
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
import { Text, TextSize } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'

interface MainPageGreatingProps {
    className?: string
}

export const MainPageGreating = ({ className }: MainPageGreatingProps) => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [size, setSize] = useState<TextSize>(
        window.innerWidth >= 768 ? 'm' : 's',
    )
    const [width, setWidth] = useState(window.innerWidth)
    const { t } = useTranslation()

    const cn = classNames('', {}, [className, cls['home-page']])

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && window.innerWidth >= width) {
            setSize('m')
            setWidth(window.innerWidth)
        }

        if (window.innerWidth < 768 && window.innerWidth < width) {
            setSize('s')
            setWidth(window.innerWidth)
        }
    })

    useEffect(() => {
        const timer = setTimeout(
            () => setLetterClass('text-animate-hover'),
            6000,
        )
        return () => clearTimeout(timer)
    }, [])

    return (
        <VStack className={cn} max>
            <VStack gap="8" max>
                <Text
                    className={cls.tags}
                    cursive
                    self="start"
                    variant="accent"
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
                    variant="accent"
                    title="<h1 />"
                />
                <Text
                    size={size}
                    className={cls.footerSign}
                    title={footerSign}
                />
                {/* TODO add contact page */}
                <Button className={cls['flat-button']}>
                    <AppLink to="/contact">{t('Contact me')}</AppLink>
                </Button>
            </VStack>
            <MainLogo />
        </VStack>
    )
}
