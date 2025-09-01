// import { AutocompleteInput } from "@/ui-kit/components/inputs";
import { AutocompleteInput } from "@/components/dashboard/atoms/inputs";
import { Anchor, Box, Button, Center, Flex, Group, Text, TextInput } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

export default function ForgotPasswordPage() {

    return (
        <Flex direction="column" flex={1} justify="center" gap={20} m={20}>
            <Text size="lg" fw={700}>Forgot password</Text>

            <Flex direction="column">
                <AutocompleteInput label="Enter your email to get a reset link" placeholder="me@mantine.dev" required sufixOptions={['gmail.com', 'outlook.com', 'yahoo.com']} />

                <Group justify="space-between" mt="lg" >
                    <Anchor c="dimmed" size="sm" >
                        <Center inline>
                            <IconArrowLeft size={12} stroke={1.5} />

                            <Box ml={5}>Back to the login page</Box>
                        </Center>
                    </Anchor>
                    <Button>Reset password</Button>
                </Group>
            </Flex>

        </Flex>
    )
}