import { Listbox } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Fragment, memo, ReactNode } from 'react'
import { Button } from '../Button/Button';
import { HStack } from '../Stack';
import cls from './ListBox.module.scss'
import { DropdownDirection } from '../../types/ui';

export interface ListBoxItems {
    value: string,
    content: ReactNode,
    disabled?: boolean
}

const MapDirectionClass: Record<DropdownDirection, string> = {
    'bottom right': cls.bottomRight,
    'bottom left': cls.bottomLeft,
    'top right': cls.topRight,
    'top left': cls.topLeft,
}
interface ListBoxProps {
    className?: string
    items?: ListBoxItems[],
    label?: string,
    value?: string,
    defaultValue?: string,
    onChange: (value: string) => void,
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

    const cn = classNames(cls.ListBox, {}, [className])
    const optionsCN = classNames(cls.options, {}, [MapDirectionClass[direction]])

    return (
        <HStack gap="4">
            {label && (
                <span className={cls.label}>{`${label}>`}</span>
            )}
            <Listbox
                as="div"
                disabled={readonly}
                className={cn}
                value={value}
                onChange={onChange}
            >
                <Listbox.Button as="div" className={cls.trigger}>
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
                                    className={
                                        classNames(cls.item, { [cls.active]: active, [cls.disabled]: item.disabled })
                                    }
                                >
                                    {selected ? `> ${item.content}` : item.content}
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </HStack>
    )
})
