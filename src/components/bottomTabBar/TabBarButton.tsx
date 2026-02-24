import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { bottomTabBarHeight } from "./BottomTabBar";
import { useTheme } from "@react-navigation/native";
import { ITheme } from "../../theme";

interface ITabBarButton {
    children?: ReactNode;
    onPress?: () => void;
}

export default function TabBarButton({ children, onPress }: ITabBarButton) {
    const { colors } = useTheme() as ITheme;

    return (
        <View
            style={{
                height: bottomTabBarHeight,
                width: bottomTabBarHeight,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background,
                borderRadius: bottomTabBarHeight / 2,
            }}
        >
            <Pressable
                onPress={onPress}
                style={({ pressed }) => ({
                    height: bottomTabBarHeight,
                    width: bottomTabBarHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: pressed ? 0.3 : 1,
                    backgroundColor: colors.card,
                })}
            >
                {children}
            </Pressable>
        </View>
    )
}