import { Pressable, StyleProp, ViewStyle } from "react-native";
import { ITheme } from "../../theme";
import { useTheme } from "@react-navigation/native";

type FabVariant = {
    color: string;
    contentColor: string;
}

interface IFab {
    children: React.ReactNode | ((props: { variant: FabVariant }) => React.ReactNode)
    style?: StyleProp<ViewStyle>
    variant?: string
    onPress?: () => void
}

export default function Fab({ children, style, variant, onPress }: IFab) {

    const { colors } = useTheme() as ITheme;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                backgroundColor: colors.primary,
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: pressed ? 0.5 : 1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.25,
                shadowRadius: 2.5,
                elevation: 5,
                zIndex: 1,
                ...style,
            })}
        >
            {typeof children === 'function' ? children({ variant: { contentColor: '#fff' } }) : children}
        </Pressable>
    );
}