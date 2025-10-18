import { useUpdateSettings } from "@/apis/account.api";
import { Account, AccountSettings } from "@/declarators";
import { Flex, Card, Text, Box, Switch } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconClock } from "@tabler/icons-react";
import { FC } from "react";

export const AccountSettingsBlock: FC<{ account: Account }> = ({ account }) => {
  const onSuccess = () => {
    notifications.show({
      title: "Notifications updated",
      message: "Your notifications were updated with success!",
    });
  };

  const { mutate: updateRecord, isPending } = useUpdateSettings(
    {
      accountId: account.id,
    },
    onSuccess
  );

  if (!account.settings) return null;

  const settings = account.settings as AccountSettings;

  return (
    <Card
      radius="sm"
      withBorder={false}
      p={0}
      w="100%"
      style={{
        minWidth: "250px",
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center" p={20} pb={10} gap={10}>
          <IconClock />

          <Text>Notifications</Text>
        </Flex>
      </Flex>

      <Flex direction="column" p={10} gap={10}>
        <EmailOption
          onChange={(value) =>
            updateRecord({
              sendWeeklyReport: value,
            })
          }
          defaultValue={settings.sendWeeklyReport}
          title="Weekly report"
          description="Get a weekly summary of your social media performance"
        />

        <EmailOption
          onChange={(value) =>
            updateRecord({
              sendPostFailures: value,
            })
          }
          defaultValue={settings.sendPostFailures}
          title="Post Failures"
          description="Receive email when a post fails to publish"
        />

        <EmailOption
          onChange={(value) =>
            updateRecord({
              sendAccountDisconnections: value,
            })
          }
          defaultValue={settings.sendAccountDisconnections}
          title="Social Account Disconnections"
          description="Receive email when a social media account gets disconnected"
        />
      </Flex>
    </Card>
  );
};

const EmailOption: FC<{
  defaultValue?: string;
  onChange: (value: string) => void;
  title: string;
  description: string;
}> = ({ defaultValue, onChange, title, description }) => (
  <Card withBorder={false} p={10}>
    <Flex justify="space-between" align="center" gap={20}>
      <Flex direction="column">
        <Text fw={600} size="sm">
          {title}
        </Text>

        <Text c="dimmed" size="sm">
          {description}
        </Text>
      </Flex>

      <Box>
        <Switch
          defaultChecked={defaultValue === "true"}
          onChange={(e) => {
            onChange(e.currentTarget.checked ? "true" : "false");
          }}
        />
      </Box>
    </Flex>
  </Card>
);
