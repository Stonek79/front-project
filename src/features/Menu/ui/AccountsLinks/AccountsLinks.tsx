import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex'
import { Icon } from '@/shared/ui/redesigned/Icon'
import cls from './AccountsLinks.module.scss'
import Hexlet from '@/shared/assets/icons/hexlet.svg'
import GitHub from '@/shared/assets/icons/github.svg'
import Codewars from '@/shared/assets/icons/codewars.svg'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { Text } from '@/shared/ui/redesigned/Text'
import { codewars, githab, hexlet } from '@/shared/const/about'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'
import { classNames } from '@/shared/lib/classNames/classNames'

interface AccountsLinksProps {
    short?: boolean
    className?: string
}

export const AccountsLinks = (props: AccountsLinksProps) => {
    const { short, className } = props
    const { isScreenSm } = useResize()

    const cnMobile = classNames(
        cls.AccountsLinks,
        { [cls.mobile]: !isScreenSm },
        [className],
    )

    return !isScreenSm ? (
        <VStack className={cnMobile} gap="4">
            <AppLink
                target="_blank"
                to="https://github.com/Stonek79/front-project"
            >
                <HStack gap="16">
                    <div className={cls.iconWrapper}>
                        <Icon
                            width={24}
                            height={24}
                            className={cls.account}
                            Svg={GitHub}
                        />
                    </div>
                    <Text title={githab} />
                </HStack>
            </AppLink>
            <AppLink
                target="_blank"
                to="https://www.codewars.com/users/Stonek79"
            >
                <HStack gap="16">
                    <div className={cls.iconWrapper}>
                        <Icon
                            width={24}
                            height={24}
                            className={cls.account}
                            Svg={Codewars}
                        />
                    </div>
                    <Text title={codewars} />
                </HStack>
            </AppLink>
            <AppLink target="_blank" to="https://ru.hexlet.io/u/alexk">
                <HStack gap="16">
                    <div className={cls.iconWrapper}>
                        <Icon
                            width={24}
                            height={24}
                            className={cls.account}
                            Svg={Hexlet}
                        />
                    </div>
                    <Text title={hexlet} />
                </HStack>
            </AppLink>
        </VStack>
    ) : (
        <Flex
            className={className}
            gap={short ? '16' : '32'}
            direction={short ? 'column' : 'row'}
        >
            <AppLink
                target="_blank"
                to="https://github.com/Stonek79/front-project"
            >
                <Icon
                    width={short ? 24 : 32}
                    height={short ? 24 : 32}
                    className={cls.account}
                    Svg={GitHub}
                />
            </AppLink>
            <AppLink
                target="_blank"
                to="https://www.codewars.com/users/Stonek79"
            >
                <Icon
                    width={short ? 24 : 32}
                    height={short ? 24 : 32}
                    className={cls.account}
                    Svg={Codewars}
                />
            </AppLink>
            <AppLink target="_blank" to="https://ru.hexlet.io/u/alexk">
                <Icon
                    width={short ? 24 : 32}
                    height={short ? 24 : 32}
                    className={cls.account}
                    Svg={Hexlet}
                />
            </AppLink>
        </Flex>
    )
}
