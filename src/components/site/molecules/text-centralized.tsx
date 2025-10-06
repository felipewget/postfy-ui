import { Flex, Text, TextProps } from "@mantine/core";
import { FC, ReactNode } from "react"

type TextCentralizedProps = {
    label?: string;
    title?: string;
    descriptions: string[];
    footer?: ReactNode;
    textProps?: TextProps;
    descriptionProps?: TextProps;
}

export const TextCentralized: FC<TextCentralizedProps> = ({ label, title, descriptions, footer, textProps = {}, descriptionProps = {} }) => {
    return (
        <Flex justify="center">
            <Flex direction="column" gap={20} align="center" w="100%" px={10} style={{
                maxWidth: "950px"
            }}>
                <Flex direction="column" align="center">
                    {label && <Text size="sm" ta="center" {...textProps}>{label}</Text>}

                    {title && <Text size="2xl" fw={500} ta="center" {...textProps}>{title}</Text>}
                </Flex>

                {descriptions && descriptions.map((description) => <Text fw={500} size="md" c={descriptionProps?.color ? descriptionProps?.color : "dimmed"} {...descriptionProps} ta="center">{description}</Text>)}

                {footer}
            </Flex>
        </Flex>
    )
}