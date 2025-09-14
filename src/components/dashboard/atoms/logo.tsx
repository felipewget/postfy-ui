import { Flex } from '@mantine/core';
import { IconMailbox } from '@tabler/icons-react';

export const Logo = ({ size = 40 }) => {
    return (
        <Flex w={size} h={size}
            bg="violet"
            justify="center"
            align="center"
            style={{
                borderRadius: '3px'
            }}>
            <IconMailbox color="white" stroke={1} size={(size / 100) * 66} />
        </Flex>
    );
};