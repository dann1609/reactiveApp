import { DarkTheme, DefaultTheme, Theme, useTheme } from "@react-navigation/native";

export { useTheme }

export interface ITheme extends Theme {
}

export function getTheme(scheme: string) {
    return scheme === 'dark' ? DarkTheme : DefaultTheme;
}