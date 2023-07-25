import { useCallback, useEffect, useRef, useState } from 'react'
import NodeJS from '@/shared/assets/certificate_hexlet_node_js_small.png'
import FrontJS from '@/shared/assets/sertificate_hexlet_front_js_small.png'
import NodeJSOriginal from '@/shared/assets/certificate_hexlet_node_js_original.png'
import FrontJSOriginal from '@/shared/assets/sertificate_hexlet_front_js_original.png'
import { AnimatedLetters } from '@/features/AnimatedLetters'
import {
    aboutMe,
    aboutTextBlocks,
    hexlet,
    textWithHexlet,
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

    const direction = (width: number) => (width >= 850 ? 'row' : 'column')

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
                        strArray={aboutMe}
                        index={15}
                    />
                </HStack>
                {aboutTextBlocks.map((block) => (
                    <Text key={block.length} text={block} />
                ))}
                <div>
                    {textWithHexlet}
                    <AppLink
                        className={cls.link}
                        to="https://ru.hexlet.io/"
                        target="_blank"
                    >
                        {hexlet}
                    </AppLink>
                </div>
                <HStack gap="8" justify="between" max>
                    <Card
                        cardPaddings="4"
                        clickable
                        onClick={() => onOpenModal(FrontJSOriginal)}
                    >
                        <AppImage
                            className={cls.sertificate}
                            src={FrontJS}
                            alt="FrontJS"
                        />
                    </Card>
                    <Card
                        cardPaddings="4"
                        clickable
                        onClick={() => onOpenModal(NodeJSOriginal)}
                    >
                        <AppImage
                            className={cls.sertificate}
                            src={NodeJS}
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
