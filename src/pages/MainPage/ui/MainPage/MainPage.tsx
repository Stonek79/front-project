import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'

// const picturesUrls = [
//     'https://playgroundai.com/api/images/risingFeed?category=animals',
//     'https://playgroundai.com/api/images/risingFeed?category=anime',
//     'https://playgroundai.com/api/images/risingFeed?category=fashion',
//     'https://playgroundai.com/api/images/risingFeed?category=food',
//     'https://playgroundai.com/api/images/risingFeed?category=landscapes',
//     'https://playgroundai.com/api/images/risingFeed?category=scifi',
//     'https://playgroundai.com/api/images/risingFeed?category=vehicles',
// ]

const MainPage = () => {
    const { t } = useTranslation()

    // const [img, setImg] = useState('')
    // const images: string[] = useMemo(() => [], [])
    //
    // const cors1 = 'https://thingproxy.freeboard.io/fetch/'

    // useEffect(() => {
    //     try {
    // const request = picturesUrls.map(
    //     (url) =>
    //         axios.get(`https://thingproxy.freeboard.io/fetch/${url}`),
    // .then((req) => console.log(req, '1'))
    // .catch((e) => console.log(e)),
    // )

    // const animals = axios.get(
    //     `http://thingproxy.freeboard.io/fetch/https://playgroundai.com/api/images/risingFeed?category=anime`,
    // )
    // .then((req) => console.log(req))
    // .catch((e) => console.log(e))

    // console.log(animals)

    // Promise.all(request)
    //     .then((res) => {
    //         console.log(res, '2')
    //         return res.map((el) => console.log(el, '3'))
    //     })
    // .then((res) => res.map((el) => el.uniqueImages))
    // .then((res) =>
    //     res
    //         .flat()
    //         .map((img) => img.url)
    //         .flat(),
    // )
    // .then((res) => {
    //     setImg(res[0])
    //     images.push(...res)
    // })
    // .catch((e) => console.log(e))
    // } catch (e) {
    //     console.log(e)
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // console.log('!!!', images.length)
    // useEffect(() => {
    //     if (images.length) {
    //         images
    //             .sort()
    //             .slice(0, 100)
    //             .forEach((el, i) => {
    //                 console.log(el, i)
    //                 setTimeout(() => setImg(el), 3000 * (i + 1))
    //             })
    //     }
    // }, [images, images.length])

    return (
        // @ts-ignore
        <Page data-testid="MainPage">
            <VStack align="center" gap="8" max>
                <Text bold text={t('Main Page')} />
                <Text text={t('The page is in development')} />
                {/* <Card cardBorder="rounded" cardPaddings="16"> */}
                {/*     {img ? ( */}
                {/*         <AppImage height={700} src={img} /> */}
                {/*     ) : ( */}
                {/*         <Skeleton width={500} height={700} /> */}
                {/*     )} */}
                {/* </Card> */}
            </VStack>
        </Page>
    )
}
export default memo(MainPage)
