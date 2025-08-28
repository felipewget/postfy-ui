"use client";

import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Group,
  Input,
  Paper,
  Text,
  Textarea,
  FileButton,
} from "@mantine/core";

import { useState } from "react";

type WeekDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

const days: { label: string; value: WeekDay }[] = [
  { label: "Sunday", value: "sunday" },
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
];

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [weekBusinessDays, setWeekBusinessDays] = useState<WeekDay[]>([]);

  return (
    <Flex
      p={20}
      direction="column"
      w="100%"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <Flex w="100%" justify="space-between" align="center" pb={20} pt={10}>
        <Flex gap={20} align="center">
          <Avatar size="lg" />

          <Flex direction="column">
            <Text size="xl" fw={600}>
              Company Settings
            </Text>
            <Text c="dimmed">Update your company details</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Form */}
      <Paper p="lg" radius="md" withBorder w="100%">
        <Flex direction="column" gap="lg">
          <Flex gap={20}>
            <Avatar
              size="lg"
              src={avatar ? URL.createObjectURL(avatar) : undefined}
              radius="sm"
            />

            <Group>
              <FileButton onChange={setAvatar} accept="image/png,image/jpeg">
                {(props) => (
                  <Button {...props} variant="light">
                    {avatar ? "Change Avatar" : "Upload Avatar"}
                  </Button>
                )}
              </FileButton>
            </Group>
          </Flex>

          <Input.Wrapper label="Company title" required>
            <Input placeholder="Your company name" />
          </Input.Wrapper>

          <Textarea
            label="Description"
            placeholder="Describe your company..."
            minRows={3}
            autosize
          />

          <Paper>
            <Checkbox.Group
              value={weekBusinessDays}
              onChange={(val) => setWeekBusinessDays(val as WeekDay[])}
              label="Business Days"
            >
              <Group mt="xs">
                {days.map((day) => (
                  <Checkbox
                    key={day.value}
                    value={day.value}
                    label={day.label}
                  />
                ))}
              </Group>
            </Checkbox.Group>
          </Paper>

          <Input.Wrapper label="Hours per day">
            <Input type="number" placeholder="8" min={1} max={24} />
          </Input.Wrapper>

          <Input.Wrapper label="Email" required>
            <Input type="email" placeholder="your@email.com" />
          </Input.Wrapper>

          <Input.Wrapper label="Phone">
            <Input type="tel" placeholder="+55 41 99999-9999" />
          </Input.Wrapper>

          <Button size="md" mt="md">
            Save Settings
          </Button>
        </Flex>
      </Paper>
    </Flex>
  );
}
