import { Flex, Image, Text, TextProps } from "@mantine/core";
import { FC, ReactNode } from "react"

type Contentlock = {
    label?: string;
    title?: string;
    description: string;
    footer?: ReactNode;
};

type TextNextToImageProps = {
    contents: Contentlock[];
    image: string;
    imageSize?: any;
    justify?: "row" | 'row-reverse';
    textProps?: TextProps;
    descriptionProps?: TextProps;
}

export const TextNextToImage: FC<TextNextToImageProps> = ({ contents, image, imageSize="400px", justify = "row", textProps = {}, descriptionProps = {} }) => {
    return (
        <Flex direction={justify} gap={64} justify="center" align="center" wrap="wrap">
            <Flex direction="column" gap={10} w={450} >
                {contents.map(({ label, title, description, footer }, key) => (
                    <Flex direction="column" gap={10} key={key}>
                        <Flex direction="column">
                            {label && <Text size="sm" {...textProps}>{label}</Text>}

                            {title && <Text size="2xl" {...textProps}>{title}</Text>}
                        </Flex>

                        {description && <Text c={descriptionProps?.color ? descriptionProps?.color : "dimmed"} {...descriptionProps}>{description}</Text>}

                        {footer}
                    </Flex>
                ))}
            </Flex>

            <Flex w={imageSize}>
                <Image alt="image" w={imageSize} src={image} />
            </Flex>
        </Flex >
    )
}