import { Flex, FlexProps } from '../Flex/Flex';

// Omit Позволяет исключить поле из FlexProps
type VStackProps = Omit<FlexProps, 'direction'>;

// 10_3 12min
export const VStack = (props: VStackProps) => {
    const { align = 'start' } = props;
    return <Flex {...props} direction="column" align={align} />;
};
