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

export default function DashboardPage() {
  return (
    <p>adas</p>
  );
}
