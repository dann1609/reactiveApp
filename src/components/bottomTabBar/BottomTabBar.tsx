import { View, Pressable, Text as NativeText } from "react-native";
import { Text, Fab } from "../index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { ITheme } from "../../theme";
import TabBarButton from "./TabBarButton";

import { HomeIcon, ShoppingCartIcon, UserIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";

export const bottomTabBarHeight = 60;

export default function BottomTabBar() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme() as ITheme;
    const navigation = useNavigation();

    const onAddPress = () => {
    }

    return (
        <View
            style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.card,
                borderTopWidth: 1,
                borderColor: colors.border,
                paddingBottom: insets.bottom,
                paddingTop: 10,
                paddingHorizontal: 10
            }}
        >
            <Fab
                onPress={onAddPress}
                style={{
                    position: 'absolute',
                    top: -25,
                }}
            >
                {({ variant }) => <ShoppingCartIcon stroke={variant.contentColor} />}
            </Fab >
            <View
                style={{
                    height: bottomTabBarHeight,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <TabBarButton
                    onPress={() => navigation.navigate('Home')}
                >
                    <HomeIcon stroke={colors.text} />
                </TabBarButton>
                <TabBarButton
                >
                    <UserIcon stroke={colors.text} />
                </TabBarButton>
            </View>
        </View>
    );
}
