import { useCallback, useEffect, useRef, useState } from 'react'
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
} from '../../model/consts/consts'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Card } from '@/shared/ui/redesigned/Card'
import cls from './AboutPageInfoBlock.module.scss'
import { SpinnedCube } from '@/features/SpinnedCube'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { useResizeObserver } from '@/shared/lib/hooks/useResizeObserver/useResizeObserver'
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex'
import { BigCertificateModal } from '@/features/BigCertificateModal'

export const AboutPageInfoBlock = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [isOpen, setIsOpen] = useState(false)
    const [imgPath, setImgPath] = useState('')
    const sizeRef = useRef(document.body)
    const { width } = useResizeObserver({ element: sizeRef })
    const { t, i18n } = useTranslation()

    const isRuLng = i18n.language === 'ru'

    const direction = (width: number) => (width >= 1200 ? 'row' : 'column')

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
        <Flex direction={direction(width)} max>
            <VStack gap="16" max>
                <HStack gap="16" className={cls.letters}>
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={isRuLng ? aboutMeRu : aboutMe}
                        index={15}
                    />
                </HStack>
                {(isRuLng ? aboutTextBlocksRu : aboutTextBlocks).map(
                    (block) => (
                        <Text key={block.length} text={block} />
                    ),
                )}
                <div>
                    {isRuLng ? textWithHexletRu : textWithHexlet}
                    <AppLink
                        className={cls.link}
                        to="https://ru.hexlet.io/"
                        target="_blank"
                    >
                        {hexlet}
                    </AppLink>
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
                            className={cls.sertificate}
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
                            className={cls.sertificate}
                            src={isRuLng ? NodeJS : NodeJSEng}
                            alt="NodeJS"
                        />
                    </Card>
                </HStack>
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
