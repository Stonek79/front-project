import { useTranslation } from 'react-i18next'
import { memo, useState } from 'react'
import axios from 'axios'
import { Page } from '@/widgets/Page'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Card } from '@/shared/ui/redesigned/Card'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

const MainPage = () => {
    const { t } = useTranslation()
    const pictureUrls = [
        'https://playgroundai.com/api/images/risingFeed?category=animals',
        'https://playgroundai.com/api/images/risingFeed?category=anime',
        'https://playgroundai.com/api/images/risingFeed?category=fashion',
        'https://playgroundai.com/api/images/risingFeed?category=food',
        'https://playgroundai.com/api/images/risingFeed?category=landscapes',
        'https://playgroundai.com/api/images/risingFeed?category=scifi',
        'https://playgroundai.com/api/images/risingFeed?category=vehicles',
    ]
    const siteName =
        'https://playgroundai.com/api/images/risingFeed?category=animals'

    const [img, setImg] = useState('')
    const parse = async () => {
        try {
            const { data } = await axios.get(siteName)

            return setImg(
                data.risingImages.map((img: { url: any }) => img.url)[0],
            )
        } catch (e) {
            console.log(e)
        }
        return null
    }

    const images = parse()

    return (
        // @ts-ignore
        <Page data-testid="MainPage">
            <VStack align="center" gap="8" max>
                {t('Главная страница')}
                <Card cardBorder="rounded" cardPaddings="16">
                    {img ? (
                        <AppImage src={img} />
                    ) : (
                        <Skeleton width={500} height={700} />
                    )}
                </Card>
            </VStack>
        </Page>
    )
}

export default memo(MainPage)
