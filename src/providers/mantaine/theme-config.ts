import { ActionIcon, Alert, Anchor, Avatar, Badge, Blockquote, Button, Card, Container, createTheme, Dialog, Indicator, Mark, NavLink, Pagination, Paper, rem, Select, Stepper, ThemeIcon, Timeline, Tooltip } from "@mantine/core";
import type { MantineThemeOverride } from "@mantine/core";
import { amberColors, blueColors, cyanColors, emeraldColors, fuchsiaColors, grayColors, greenColors, indigoColors, limeColors, neutralColors, orangeColors, pinkColors, purpleColors, redColors, roseColors, skyColors, slateColors, stoneColors, tealColors, violetColors, yellowColors, zincColors } from "./colors";

const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem("200px"),
  xs: rem("300px"),
  sm: rem("400px"),
  md: rem("500px"),
  lg: rem("600px"),
  xl: rem("1400px"),
  xxl: rem("1600px"),
};

export const mantineTheme: MantineThemeOverride = createTheme({
  /** Put your mantine theme override here */
  fontSizes: {
    xs: rem("12px"),
    sm: rem("14px"),
    md: rem("16px"),
    lg: rem("18px"),
    xl: rem("20px"),
    "2xl": rem("24px"),
    "3xl": rem("30px"),
    "4xl": rem("36px"),
    "5xl": rem("48px"),
  },
  spacing: {
    "3xs": rem("4px"),
    "2xs": rem("8px"),
    xs: rem("10px"),
    sm: rem("12px"),
    md: rem("16px"),
    lg: rem("20px"),
    xl: rem("24px"),
    "2xl": rem("28px"),
    "3xl": rem("32px"),
  },
  primaryColor: "zinc",
  colors: {
    primary: violetColors,
    zinc: zincColors,
    slate: slateColors,
    stone: stoneColors,
    gray: grayColors,
    neutral: neutralColors,
    red: redColors,
    rose: roseColors,
    orange: orangeColors,
    green: greenColors,
    blue: blueColors,
    yellow: yellowColors,
    violet: violetColors,
    amber: amberColors,
    lime: limeColors,
    emerald: emeraldColors,
    teal: tealColors,
    cyan: cyanColors,
    sky: skyColors,
    indigo: indigoColors,
    purple: purpleColors,
    fuchsia: fuchsiaColors,
    pink: pinkColors,
  },
  defaultRadius: "xs",
  components: {
    /** Put your mantine component override here */
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          "--container-size": fluid
            ? "100%"
            : size !== undefined && size in CONTAINER_SIZES
              ? CONTAINER_SIZES[size]
              : rem(size),
        },
      }),
    }),
    Paper: Paper.extend({
      defaultProps: {
        p: "md",
        shadow: "xl",
        radius: "md",
        withBorder: true,
      },
    }),

    Card: Card.extend({
      defaultProps: {
        p: "xl",
        shadow: "xl",
        radius: "var(--mantine-radius-default)",
        withBorder: true,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        checkIconPosition: "right",
      },
    }),

    /////

     ActionIcon: ActionIcon.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        const isNeutralColor = colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(colorKey);
        const isNeutralPrimaryColor = !colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(theme.primaryColor);
        const variant = props.variant ?? "filled";

        return {
          root: {
            "--ai-color": (() => {
              if (variant === "filled") {
                if (colorKey) {
                  return `var(--mantine-color-${colorKey}-contrast)`;
                }
                return "var(--mantine-primary-color-contrast)";
              }
              if (variant === "white") {
                if (isNeutralColor || isNeutralPrimaryColor) {
                  return "var(--mantine-color-black)";
                }
                return undefined;
              }
              return undefined;
            })(),
          },
        };
      }
    }),
    Button: Button.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        const isNeutralColor = colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(colorKey);
        const isNeutralPrimaryColor = !colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(theme.primaryColor);
        const variant = props.variant ?? "filled";
        return {
          root: {
            "--button-color":(() => {
              if (variant === "filled") {
                if (colorKey) {
                  return `var(--mantine-color-${colorKey}-contrast)`;
                }
                return "var(--mantine-primary-color-contrast)";
              }
              if (variant === "white") {
                if (isNeutralColor || isNeutralPrimaryColor) {
                  return "var(--mantine-color-black)";
                }
                return undefined;
              }
              return undefined;
            })(),
          },
        };
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "always",
      },
    }),
    NavLink: NavLink.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        const variant = props.variant ?? "light";
        return {
          root: {
            "--nl-color":
              variant === "filled" ? colorKey ? `var(--mantine-color-${colorKey}-contrast)` : 'var(--mantine-primary-color-contrast)' : undefined,
          },
          children: {},
        };
      },
    }),
    Pagination: Pagination.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        return {
          root: {
            "--pagination-active-color": colorKey
              ? `var(--mantine-color-${colorKey}-contrast)`
              : "var(--mantine-primary-color-contrast)",
          },
        };
      },
    }),
    Stepper: Stepper.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        return {
          root: {
            "--stepper-icon-color": colorKey
              ? `var(--mantine-color-${colorKey}-contrast)`
              : "var(--mantine-primary-color-contrast)",
          },
        };
      },
    }),
    Alert: Alert.extend({   
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        const isNeutralColor = colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(colorKey)
        const isNeutralPrimaryColor = !colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(theme.primaryColor);
        const variant = props.variant ?? "light";
        return {
          root: {
            "--alert-color":
              variant === "filled"
                ? colorKey
                  ? `var(--mantine-color-${colorKey}-contrast)`
                  : "var(--mantine-primary-color-contrast)"
                : variant === "white"
                ? (isNeutralColor || isNeutralPrimaryColor
                  ? `var(--mantine-color-black)`
                  : undefined)
                : undefined,
          },
        };
      }
    }),
    Dialog: Dialog.extend({
      defaultProps: {
        withBorder: true,
      },
    }),
    Tooltip: Tooltip.extend({
      vars: () => ({
        tooltip: {
          "--tooltip-bg": "var(--mantine-color-primary-color-filled)",
          "--tooltip-color": "var(--mantine-color-primary-color-contrast)",
        },
      }),
    }),
    Avatar: Avatar.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        const isNeutralColor = colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(colorKey);
        const isNeutralPrimaryColor = !colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(theme.primaryColor);
        const variant = props.variant ?? "light";
        return {
          root: {
            "--avatar-bg":
              variant === "filled"
                ? colorKey
                  ? `var(--mantine-color-${colorKey}-filled)`
                  : "var(--mantine-primary-color-filled)"
                : variant === "light"
                  ? colorKey
                    ? `var(--mantine-color-${colorKey}-light)`
                    : "var(--mantine-primary-color-light)"
                  : undefined,

            "--avatar-color":
              variant === "filled"
                ? colorKey
                  ? `var(--mantine-color-${colorKey}-contrast)`
                  : "var(--mantine-primary-color-contrast)"
                : variant === "light"
                  ? colorKey
                    ? `var(--mantine-color-${colorKey}-light-color)`
                    : "var(--mantine-primary-color-light-color)"
                  : variant === "white"
                    ? isNeutralColor || isNeutralPrimaryColor
                      ? `var(--mantine-color-black)`
                      : colorKey
                        ? `var(--mantine-color-${colorKey}-outline)`
                        : "var(--mantine-primary-color-filled)"
                    : variant === "outline" || variant === "transparent"
                      ? colorKey
                        ? `var(--mantine-color-${colorKey}-outline)`
                        : "var(--mantine-primary-color-filled)"
                      : undefined,

            "--avatar-bd":
              variant === "outline"
                ? colorKey
                  ? `1px solid var(--mantine-color-${colorKey}-outline)`
                  : "1px solid var(--mantine-primary-color-filled)"
                : undefined,
          },
        };
      },
    }),
    Badge: Badge.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        const isNeutralColor = colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(colorKey);
        const isNeutralPrimaryColor = !colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(theme.primaryColor);
        const variant = props.variant ?? "filled";
        return {
          root: {
            "--badge-bg": variant === "filled" && colorKey ? `var(--mantine-color-${colorKey}-filled)` : undefined,
            "--badge-color":
              variant === "filled"
                ? (colorKey ? `var(--mantine-color-${colorKey}-contrast)` : 'var(--mantine-primary-color-contrast)')
                : variant === "white"
                  ? (isNeutralColor || isNeutralPrimaryColor
                    ? `var(--mantine-color-black)`
                    : undefined)
                  : undefined,
          },
        };
      },
    }),
    Card: Card.extend({
      defaultProps: {
        p: "xl",
        shadow: "xl",
        withBorder: true,
      },
      
    }),
    Indicator: Indicator.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        return {
          root: {
            "--indicator-text-color": colorKey
              ? `var(--mantine-color-${colorKey}-contrast)`
              : "var(--mantine-primary-color-contrast)",
          },
        };
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        const isNeutralColor = colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(colorKey)
        const isNeutralPrimaryColor = !colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(theme.primaryColor);

        const variant = props.variant ?? "filled";
        return {
          root: {
              "--ti-color": variant === "filled"
                ? (colorKey
                  ? `var(--mantine-color-${colorKey}-contrast)`
                  : "var(--mantine-primary-color-contrast)")
                : variant === "white"
                  ? (isNeutralColor || isNeutralPrimaryColor
                    ? `var(--mantine-color-black)`
                    : undefined)
                  : undefined,
          },
        };
      },
    }),
    Timeline: Timeline.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        return {
          root: {
            "--tl-icon-color": colorKey ? `var(--mantine-color-${colorKey}-contrast)` : 'var(--mantine-primary-color-contrast)',
          },
        };
      },
    }),
    Blockquote: Blockquote.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : undefined;
        return {
          root: {
            "--bq-bg-dark": colorKey ? `var(--mantine-color-${colorKey}-light)` : 'var(--mantine-primary-color-light)',
            "--bq-bg-light": colorKey ? `var(--mantine-color-${colorKey}-light)` : 'var(--mantine-primary-color-light)',
          },
        };
      },
    }),
    Mark: Mark.extend({
      vars: (theme, props) => {
        const colorKey = props.color && Object.keys(theme.colors).includes(props.color) ? props.color : 'yellow';
        const isNeutralColor = colorKey && ["zinc", "slate", "gray", "neutral", "stone"].includes(colorKey);
        return {
          root: {
            "--mark-bg-light": `var(--mantine-color-${colorKey}-${isNeutralColor ? '3' : 'filled-hover'})`,
            "--mark-bg-dark": `var(--mantine-color-${colorKey}-filled)`
          },
        };
      },
    }),
  },
  other: {
    style: "mantine",
  },
});
