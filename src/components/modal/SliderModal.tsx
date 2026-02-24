import { KeyboardAvoidingView, Modal, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ITheme, useTheme } from "../../theme";

interface ISliderModal {
    visible: boolean;
    onRequestClose?: () => void;
    children?: React.ReactNode;
}

export default function SliderModal({ visible, onRequestClose = () => { }, children }: ISliderModal) {

    const { colors } = useTheme() as ITheme;
    const insets = useSafeAreaInsets();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onRequestClose}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#00000080',
                }}
            />
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View
                    onTouchStart={onRequestClose}
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}
                >
                    <View
                        onTouchStart={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: colors.background,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                backgroundColor: colors.background,
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                            }}
                        />
                        <View
                            style={{
                                marginHorizontal: 20,
                                borderBottomWidth: 0,
                                backgroundColor: colors.card,
                                marginTop: -10,
                                paddingTop: 10,
                                paddingHorizontal: 10,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                paddingBottom: insets.bottom,
                            }}
                        >
                            {children}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}