import { DropdownDirection } from '../../../../types/ui'
import cls from './Popups.module.scss'

export const MapDirectionClass: Record<DropdownDirection, string> = {
    'bottom right': cls.bottomRight,
    'bottom left': cls.bottomLeft,
    'top right': cls.topRight,
    'top left': cls.topLeft,
}
