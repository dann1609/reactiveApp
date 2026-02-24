import { ReactNode, useState } from "react";
import { ColorSchemeName, ColorValue, Platform, ScrollView, StatusBar, StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView, useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";

interface ILayout {
    bgColor?: ColorValue
    noScroll?: boolean
    style?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
    disableBottomInset?: boolean
    children: ReactNode
}

export default function Layout({
    bgColor,
    noScroll,
    style,
    contentContainerStyle,
    disableBottomInset,
    children
}: ILayout) {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const [contentHeight, setContentHeight] = useState(0);
    const [frameHeight, setFrameHeight] = useState(0);

    const contentBottomInset = disableBottomInset ? 0 : insets.bottom;

    const viewHeight = frameHeight - contentBottomInset
    const hasOverflow = contentHeight > viewHeight;

    const extraTopPadding =
        Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (
        <View
            style={[style, {
                flex: 1,
                backgroundColor: bgColor || colors.background
            }]}
        >
            <SafeAreaView style={{
                flex: 1,
                paddingTop: extraTopPadding,
                marginBottom: -insets.bottom
            }}>
                <ScrollView
                    onLayout={({ nativeEvent }) => setFrameHeight(nativeEvent.layout.height)}
                    scrollEnabled={!noScroll && hasOverflow}
                    onContentSizeChange={(_width, height) => setContentHeight(height)}
                    contentContainerStyle={[contentContainerStyle, {
                        maxHeight: noScroll ? (contentHeight + contentBottomInset) : undefined,
                        minHeight: viewHeight,
                        paddingBottom: contentBottomInset,
                    }]}
                >
                    {
                        children
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}