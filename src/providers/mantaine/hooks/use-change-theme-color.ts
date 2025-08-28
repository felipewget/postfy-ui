import { useLocalStorage } from "@mantine/hooks";

export const useChangeThemeColor = () => {
    const [_, setLocalThemeConfig, ___] = useLocalStorage<any>({
        key: "dashboard-theme",
    });

    return (color: string) => {
        setLocalThemeConfig({ color })
    }
};