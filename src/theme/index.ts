import { DarkTheme, DefaultTheme } from "@react-navigation/native";

import { Theme } from "@react-navigation/native";

export interface ITheme extends Theme {
}

export function getTheme(scheme: string) {
    return scheme === 'dark' ? DarkTheme : DefaultTheme;
}