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
import { VStack } from '@/shared/ui/redesigned/Stack'

interface MainPageGreatingProps {
    className?: string
}

export const MainPageGreating = ({ className }: MainPageGreatingProps) => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const { t } = useTranslation()

    const cn = classNames('', {}, [className, cls['home-page']])

    useEffect(() => {
        const timer = setTimeout(
            () => setLetterClass('text-animate-hover'),
            6000,
        )
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={cn}>
            <VStack className={cls['text-zone']}>
                <h1>
                    <span className={cls[letterClass]}>{HLetter}</span>
                    <span className={`${cls[letterClass]} _12`}>{iLetter}</span>
                    <br />
                    <span className={`${cls[letterClass]} _13`}>{ILetter}</span>
                    <span className={`${cls[letterClass]} _14`}>{mLetter}</span>
                    <img src={MyLogoTitle} alt="Web Developer Name" />
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={nameArray}
                        index={15}
                    />
                    <br />
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
                    <br />
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={jobArray3}
                        index={38}
                    />
                </h1>
                <h2>{footerSign}</h2>
                {/* TODO add contact page */}
                <AppLink to="/contact" className={cls['flat-button']}>
                    {t('Contact me')}
                </AppLink>
            </VStack>
            <MainLogo />
        </div>
    )
}
