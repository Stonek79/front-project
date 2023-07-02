import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngular,
    faCss3,
    faGitAlt,
    faHtml5,
    faJsSquare,
    faReact,
} from '@fortawesome/free-brands-svg-icons'
import cls from './SpinnedCube.module.scss'

export const SpinnedCube = () => (
    <div className={cls['stage-cube-cont']}>
        <div className={cls.cubespinner}>
            <div className={cls.face1}>
                <FontAwesomeIcon icon={faAngular} color="#DD0031" />
            </div>
            <div className={cls.face2}>
                <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className={cls.face3}>
                <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className={cls.face4}>
                <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className={cls.face5}>
                <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className={cls.face6}>
                <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
        </div>
    </div>
)
