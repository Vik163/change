import { Flex, FlexProps } from '../Flex/Flex';

// Omit Позволяет исключить поле из FlexProps
type HStackProps = Omit<FlexProps, 'direction'>;

// 10_3 12min
export const HStack = (props: HStackProps) => {
    return <Flex direction="row" {...props} />;
};
