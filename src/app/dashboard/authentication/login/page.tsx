"use client";

import { ClientCard } from "@/components/dashboard/molecules/client/client-card";
import { DrawerClientForm } from "@/components/dashboard/molecules/client/drawer-client-form";
import { ModalClientPreview } from "@/components/dashboard/molecules/client/modal-client-preview";
import { FormLogin } from "@/components/dashboard/molecules/user/form-login";
import { ListTemplate } from "@/components/dashboard/templates/list-template";
import {
  Anchor,
  Avatar,
  Button,
  Flex,
  Input,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import {
  IconFilterFilled,
  IconSearch,
  IconSortDescending,
} from "@tabler/icons-react";

export default function LoginPage() {
  return (
    <Flex direction="column" flex={1} justify="center" gap={20} m={20}>
            <FormLogin />

            <Text ta="center">
                You lost your account?{` `}

                <Anchor<'a'> href="/authentication/register" fw={500} >
                    Recover password
                </Anchor>
            </Text>
        </Flex>
  );
}
