import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex'
import { Icon } from '@/shared/ui/redesigned/Icon'
import cls from './AccountsLinks.module.scss'
import Hexlet from '@/shared/assets/icons/hexlet.svg'
import GitHub from '@/shared/assets/icons/github.svg'
import Codewars from '@/shared/assets/icons/codewars.svg'
import { AppLink } from '@/shared/ui/redesigned/AppLink'

interface AccountsLinksProps {
    short?: boolean
    className?: string
}

export const AccountsLinks = (props: AccountsLinksProps) => {
    const { short, className } = props

    return (
        <Flex
            className={className}
            gap="16"
            direction={short ? 'column' : 'row'}
        >
            <AppLink
                target="_blank"
                to="https://github.com/Stonek79/front-project"
            >
                <Icon className={cls.account} Svg={GitHub} />
            </AppLink>
            <AppLink
                target="_blank"
                to="https://www.codewars.com/users/Stonek79"
            >
                <Icon className={cls.account} Svg={Codewars} />
            </AppLink>
            <AppLink target="_blank" to="https://ru.hexlet.io/u/alexk">
                <Icon className={cls.account} Svg={Hexlet} />
            </AppLink>
        </Flex>
    )
}
