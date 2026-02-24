import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { ITheme, useTheme } from "../../theme";

type ButtonVariant = {
    color: string;
    contentColor: string;
}

interface IButton {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
    disabled?: boolean
    onPress?: () => void
}

export default function Button({ children, style, disabled, onPress }: IButton) {
    const { colors } = useTheme() as ITheme;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                backgroundColor: !disabled ? colors.primary : colors.border,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: pressed ? 0.5 : 1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 6,
                ...style,
            })}
        >
            {children}
        </Pressable>
    );
}