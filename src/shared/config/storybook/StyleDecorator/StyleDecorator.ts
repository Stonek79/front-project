// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import '@/app/styles/index.scss'
import { Story } from '@storybook/react'

export const StyleDecorator = (story: () => Story) => story()
