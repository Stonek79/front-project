import cls from './SpinnedCube.module.scss'
import Angular from '@/shared/assets/icons/angular.svg'
import Css3 from '@/shared/assets/icons/css3.svg'
import ReactIcon from '@/shared/assets/icons/react.svg'
import GitIcon from '@/shared/assets/icons/git-alt.svg'
import Html5Icon from '@/shared/assets/icons/html5.svg'
import JSIcon from '@/shared/assets/icons/js-icon.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'

export const SpinnedCube = () => (
    <div className={cls['stage-cube-cont']}>
        <div className={cls.cubespinner}>
            <div className={cls.face1}>
                <Icon Svg={Angular} width={100} height={100} fill="#DD0031" />
            </div>
            <div className={cls.face2}>
                <Icon Svg={Html5Icon} width={100} height={100} fill="#F06529" />
            </div>
            <div className={cls.face3}>
                <Icon Svg={Css3} width={100} height={100} fill="#28A4D9" />
            </div>
            <div className={cls.face4}>
                <Icon Svg={ReactIcon} width={100} height={100} fill="#5ED4F4" />
            </div>
            <div className={cls.face5}>
                <Icon Svg={JSIcon} width={100} height={100} fill="#EFD81D" />
            </div>
            <div className={cls.face6}>
                <Icon Svg={GitIcon} width={100} height={100} fill="#EC4D28" />
            </div>
        </div>
    </div>
)
