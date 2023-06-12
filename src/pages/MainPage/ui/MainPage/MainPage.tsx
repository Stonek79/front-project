import { useTranslation } from 'react-i18next'
import { memo, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Page } from '@/widgets/Page'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Card } from '@/shared/ui/redesigned/Card'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

const picturesUrls = [
    'https://playgroundai.com/api/images/risingFeed?category=animals',
    'https://playgroundai.com/api/images/risingFeed?category=anime',
    'https://playgroundai.com/api/images/risingFeed?category=fashion',
    'https://playgroundai.com/api/images/risingFeed?category=food',
    'https://playgroundai.com/api/images/risingFeed?category=landscapes',
    'https://playgroundai.com/api/images/risingFeed?category=scifi',
    'https://playgroundai.com/api/images/risingFeed?category=vehicles',
]

const MainPage = () => {
    const { t } = useTranslation()

    const [img, setImg] = useState('')
    const images: string[] = useMemo(() => [], [])

    useEffect(() => {
        const request = picturesUrls.map((url) => axios.get(url))
        Promise.all(request)
            .then((res) => res.map((el) => el.data))
            .then((res) => res.map((el) => el.uniqueImages))
            .then((res) =>
                res
                    .flat()
                    .map((img) => img.url)
                    .flat(),
            )
            .then((res) => {
                setImg(res[0])
                images.push(...res)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('!!!', images.length)
    useEffect(() => {
        if (images.length) {
            images
                .sort()
                .slice(0, 100)
                .forEach((el, i) => {
                    console.log(el, i)
                    setTimeout(() => setImg(el), 3000 * (i + 1))
                })
        }
    }, [images, images.length])

    return (
        // @ts-ignore
        <Page data-testid="MainPage">
            <VStack align="center" gap="8" max>
                {t('Главная страница')}
                <Card cardBorder="rounded" cardPaddings="16">
                    {img ? (
                        <AppImage height={700} src={img} />
                    ) : (
                        <Skeleton width={500} height={700} />
                    )}
                </Card>
            </VStack>
        </Page>
    )
}

export default memo(MainPage)
