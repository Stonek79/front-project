import { Flex, FlexProps } from '../Flex/Flex'

type HStackProps = Omit<FlexProps, 'direction'>

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const HStack = (props: HStackProps) => (
    <Flex direction="row" {...props} />
)
