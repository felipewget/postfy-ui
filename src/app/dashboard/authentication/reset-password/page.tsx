// import { AutocompleteInput, PasswordMeterInput } from "@/ui-kit/components/inputs";
import { AutocompleteInput, PasswordMeterInput } from "@/components/dashboard/atoms/inputs";
import { Button, Flex, Text } from "@mantine/core";

export default function ResetPasswordPage() {
    return (
        <Flex direction="column" flex={1} justify="center" gap={20} m={20}>
            <Text size="lg" fw={700}>Reset password</Text>

            <AutocompleteInput placeholder="Your email" label="Your e-mail" sufixOptions={['gmail.com', 'outlook.com', 'yahoo.com']} required />

            <PasswordMeterInput />

            <Text size="sm">
                By logging into your account, you agree to our Terms of Use and Privacy Policy.
            </Text>

            <Button fullWidth loading loaderProps={{ type: 'dots' }}>
                Login
            </Button>
        </Flex>
    )
}