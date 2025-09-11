"use client";

import { Skeleton } from "@mantine/core";
import { FC, ReactNode, useEffect } from "react";

export const ButtonFormTask: FC<{}> = () => {
  return (
    <>
      <Skeleton height={8} mt={6} radius="xl" />

      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </>
  );
};
