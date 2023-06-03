import { Listbox } from '@headlessui/react'
import { Fragment, ReactNode, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../../redesigned/Stack'
import cls from './ListBox.module.scss'
import clsPopup from '../../styles/Popups.module.scss'
import { DropdownDirection } from '../../../../../types/ui'
import { MapDirectionClass } from '../../styles/consts'
import { Icon } from '../../../Icon'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'

export interface ListBoxItem<T extends string> {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[]
    className?: string
    value?: T
    defaultValue?: string
    onChange: (value: T) => void
    readonly?: boolean
    direction?: DropdownDirection
    label?: string
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
    const {
        items,
        className,
        defaultValue,
        value,
        label,
        readonly,
        direction = 'bottom right',
        onChange,
    } = props

    const cn = classNames(clsPopup.popup, {}, [className])
    const optionsCN = classNames(clsPopup.options, {}, [
        MapDirectionClass[direction],
    ])

    const selectedItem = useMemo(
        () => items?.find((item) => item.value === value),
        [items, value],
    )

    return (
        <HStack gap="4">
            {label && <span>{label}</span>}
            <Listbox
                as="div"
                disabled={readonly}
                className={cn}
                value={value}
                onChange={onChange}
            >
                <Listbox.Button as="div" className={clsPopup.trigger}>
                    <Button
                        variant="filled"
                        disabled={readonly}
                        addonRight={<Icon Svg={ArrowIcon} />}
                    >
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </Listbox.Button>
                <Listbox.Options className={optionsCN}>
                    {items?.map((item) => (
                        <Listbox.Option
                            key={item.value}
                            as={Fragment}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [clsPopup.active]: active,
                                        [clsPopup.disabled]: item.disabled,
                                    })}
                                >
                                    {selected
                                        ? `> ${item.content}`
                                        : item.content}
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </HStack>
    )
}
