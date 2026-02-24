import { View, Pressable } from "react-native";
import { Text, Fab } from "../index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { ITheme } from "../../theme";
import TabBarButton from "./TabBarButton";

import { HomeIcon, ShoppingCartIcon, UserIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../hooks/useCart";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/Navigation";

export const bottomTabBarHeight = 60;

export default function BottomTabBar() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme() as ITheme;
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const [cart, { getTotalItems }] = useCart();

    const totalItems = getTotalItems();

    const onCartPress = () => {
        navigation.navigate('Cart');
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
                onPress={onCartPress}
                style={{
                    position: 'absolute',
                    top: -25,
                }}
            >
                {({ variant }) => (
                    <View>
                        <ShoppingCartIcon stroke={variant.contentColor} />
                        {totalItems > 0 && (
                            <View
                                style={{
                                    position: 'absolute',
                                    right: -8,
                                    top: -8,
                                    backgroundColor: colors.notification,
                                    borderRadius: 10,
                                    width: 18,
                                    height: 18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {totalItems}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
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
