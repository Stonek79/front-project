import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import NodeJS from '@/shared/assets/node-certificate-ru-small.jpg'
import FrontJS from '@/shared/assets/front-certificate-ru-small.jpg'
import NodeJSEng from '@/shared/assets/back-certificate-en-small.jpg'
import FrontJSEng from '@/shared/assets/front-certificate-en-small.jpg'
import NodeJSOriginal from '@/shared/assets/certificate_hexlet_node_js_original.png'
import FrontJSOriginal from '@/shared/assets/sertificate_hexlet_front_js_original.png'
import NodeJSOriginalEng from '@/shared/assets/back-certificate-en.jpg'
import FrontJSOriginalEng from '@/shared/assets/front-certificate-en.jpg'
import { AnimatedLetters } from '@/features/AnimatedLetters'
import {
    aboutMe,
    aboutMeRu,
    aboutTextBlocks,
    aboutTextBlocksRu,
    hexlet,
    textWithHexlet,
    textWithHexletRu,
    additionalInfoText,
    additionalInfoTextRu,
    contactGitHubRu,
    contactGitHub,
    additionalInfoText2,
    additionalInfoTextRu2,
    contactWithMeRu,
    contactWithMe,
    orRu,
    or,
} from '../../../../shared/const/about'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Card } from '@/shared/ui/redesigned/Card'
import cls from './AboutPageInfoBlock.module.scss'
import { SpinnedCube } from '@/features/SpinnedCube'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex'
import { BigCertificateModal } from '@/features/BigCertificateModal'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

export const AboutPageInfoBlock = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [isOpen, setIsOpen] = useState(false)
    const [imgPath, setImgPath] = useState('')
    const { i18n } = useTranslation()
    const { isScreenXl } = useResize()

    const isRuLng = i18n.language === 'ru'

    const width = isScreenXl ? 'row' : 'column'

    const onOpenModal = useCallback((path: string) => {
        setIsOpen(true)
        setImgPath(path)
    }, [])

    const onCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    useEffect(() => {
        const timer = setTimeout(
            () => setLetterClass('text-animate-hover'),
            4000,
        )
        return () => clearTimeout(timer)
    }, [])

    return (
        <Flex direction={width} max>
            <VStack className={cls.aboutPageInfo} gap="8" max>
                <HStack gap="16" className={cls.letters}>
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={isRuLng ? aboutMeRu : aboutMe}
                        index={15}
                    />
                </HStack>
                <div lang={i18n.language} className={cls.text}>
                    {isRuLng ? aboutTextBlocksRu : aboutTextBlocks}
                </div>
                <div>
                    <div lang={i18n.language} className={cls.text}>
                        {isRuLng ? textWithHexletRu : textWithHexlet}
                        <AppLink
                            className={cls.link}
                            to="https://ru.hexlet.io/"
                            target="_blank"
                        >
                            {hexlet}
                        </AppLink>
                    </div>
                </div>
                <HStack gap="16" justify="center" max>
                    <Card
                        cardPaddings="4"
                        clickable
                        onClick={() =>
                            onOpenModal(
                                isRuLng ? FrontJSOriginal : FrontJSOriginalEng,
                            )
                        }
                    >
                        <AppImage
                            className={cls.certificate}
                            src={isRuLng ? FrontJS : FrontJSEng}
                            alt="FrontJS"
                        />
                    </Card>
                    <Card
                        cardPaddings="4"
                        clickable
                        onClick={() =>
                            onOpenModal(
                                isRuLng ? NodeJSOriginal : NodeJSOriginalEng,
                            )
                        }
                    >
                        <AppImage
                            className={cls.certificate}
                            src={isRuLng ? NodeJS : NodeJSEng}
                            alt="NodeJS"
                        />
                    </Card>
                </HStack>
                <div lang={i18n.language} className={cls.text}>
                    {isRuLng ? additionalInfoTextRu : additionalInfoText}
                </div>
                <div lang={i18n.language} className={cls.text}>
                    {isRuLng ? additionalInfoTextRu2 : additionalInfoText2}
                    <AppLink
                        className={cls.link}
                        to="https://github.com/Stonek79/front-project/issues"
                        target="_blank"
                    >
                        {isRuLng ? contactGitHubRu : contactGitHub}
                    </AppLink>
                    {isRuLng ? orRu : or}
                    <AppLink
                        className={cls.link}
                        to="https://stonek79.site/contacts"
                        target="_blank"
                    >
                        {isRuLng ? contactWithMeRu : contactWithMe}
                    </AppLink>
                </div>
            </VStack>
            <SpinnedCube />
            {isOpen && (
                <BigCertificateModal
                    isOpen={isOpen}
                    onClose={onCloseModal}
                    img={imgPath}
                />
            )}
        </Flex>
    )
}
