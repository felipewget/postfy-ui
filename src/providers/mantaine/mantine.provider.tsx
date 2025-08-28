"use client";

import { MantineColorsTuple, MantinePrimaryShade, MantineProvider, MantineProviderProps, MantineThemeOverride } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import React, { FC, useMemo } from "react";
import { DEFAULT_COLORS } from "./colors";
import { mantineCssVariableResolver } from "./mantine-css-variable-resolver";
import { mantineTheme } from "./theme-config";
import { Notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css';

type ThemeProvider = {
    themeKey: string;
    children: React.ReactNode;
    defaultColorScheme?: 'dark' | 'light'
    providerProps?: MantineProviderProps;
    themeProps?: MantineThemeOverride;
}

export const ThemeProvider: FC<ThemeProvider> = ({ children, themeKey, defaultColorScheme = "light", themeProps = {}, ...providerProps }) => {
    const [localThemeConfig] = useLocalStorage<any>({
        key: themeKey,
        defaultValue: {},
    });

    const themeColor = localThemeConfig?.color ?? "violet";

    const theme = useMemo<MantineThemeOverride>(() => {
        return {
            ...mantineTheme,
            ...themeProps,
            primaryColor: themeColor,
            primaryShade: getBasePrimaryShade(themeColor),
            colors: {
                ...mantineTheme?.colors,
                secondary: getSecondaryPalette(themeColor) as unknown as MantineColorsTuple,
                dark: getSecondaryPalette(themeColor) as unknown as MantineColorsTuple,
            },
        };
    }, [themeColor, themeProps]);

    return (
        <MantineProvider
            theme={{ ...theme, ...themeProps }}
            cssVariablesResolver={mantineCssVariableResolver}
            defaultColorScheme={defaultColorScheme}
            {...providerProps}
        >
            <ModalsProvider>
                <Notifications />

                {children}
            </ModalsProvider>
        </MantineProvider>
    );
};

export const getSecondaryPalette = (color: string | undefined) => {
    return [
        "#C9C9C9", // dark 0
        "#b8b8b8", // dark 1
        "#828282", // dark 2
        "#696969", // dark 3
        "#424242", // dark 4
        "#3b3b3b", // dark 5
        "#2e2e2e", // dark 6
        "#242424", // dark 7
        "#1f1f1f", // dark 8
        "#141414", // dark 9
    ];
};

export const getBasePrimaryShade = (color: string | undefined): MantinePrimaryShade => DEFAULT_COLORS.find((item) => item.id === color)?.primaryShade as MantinePrimaryShade;