import { Listbox } from '@headlessui/react'
import { Fragment, memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../../redesigned/Stack'
import cls from './ListBox.module.scss'
import clsPopup from '../../styles/Popups.module.scss'
import { DropdownDirection } from '../../../../../types/ui'
import { MapDirectionClass } from '../../styles/consts'

export interface ListBoxItems {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface ListBoxProps {
    className?: string
    items?: ListBoxItems[]
    label?: string
    value?: string
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction?: DropdownDirection
}
export const ListBox = memo((props: ListBoxProps) => {
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

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <Listbox
                as="div"
                disabled={readonly}
                className={cn}
                value={value}
                onChange={onChange}
            >
                <Listbox.Button as="div" className={clsPopup.trigger}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
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
})
