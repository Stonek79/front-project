import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Modal } from './Modal'
import { Theme } from '@/shared/const/theme'

const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n Accusamus cumque debitis deleniti ex nam nihil nisi, quasi tempore voluptas voluptates.\n'

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: lorem,
    isOpen: true,
}

export const Dark = Template.bind({})
Dark.args = {
    children: lorem,
    isOpen: true,
    className: Theme.DARK,
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
