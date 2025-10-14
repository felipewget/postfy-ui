"use client";

import { Flex, Switch, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun, IconLogout } from "@tabler/icons-react";

export const ToggleThemeSwitch = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Flex m={10} gap={20} w="100%" justify="center" align="center">
      <IconMoon size={16} />

      <Switch
        checked={colorScheme === "light"}
        onChange={(e) => {
          e.currentTarget.checked
            ? setColorScheme("light")
            : setColorScheme("dark");
        }}
      />

      <IconSun size={16} />
    </Flex>
  );
};
