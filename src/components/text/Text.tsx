import { Text as BaseText, TextProps } from "react-native";
import { useTheme } from '../../theme'

interface IText extends TextProps {
    variant?: string
}


export default function Text({ children, style, variant = 'text', ...props }: IText) {

    const { colors } = useTheme();
    const color = colors[variant as keyof typeof colors] || colors.text;

    return (
        <BaseText style={{ color, ...style }} {...props}>
            {children}
        </BaseText>
    );
}