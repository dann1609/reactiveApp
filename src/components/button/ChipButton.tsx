import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../index";
import { useTheme } from "../../theme";

interface ChipButtonProps {
    value: string;
    onOptionSelect: (name: string, value: string) => void;
    option: any;
    isSelected: boolean;
    isValueAvailable: boolean;
}

export default function ChipButton({ value, onOptionSelect, option, isSelected, isValueAvailable }: ChipButtonProps) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            onPress={() => onOptionSelect(option.name, value)}
            disabled={isSelected}
            style={[
                styles.chip,
                {
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected ? colors.primary + '10' : 'transparent',
                    opacity: isValueAvailable || isSelected ? 1 : 0.3
                }
            ]}
        >
            <Text style={[
                styles.chipText,
                isSelected && { color: '#fff' },
                !isValueAvailable && !isSelected && { textDecorationLine: 'line-through' }
            ]}>
                {value}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        minWidth: 50,
        alignItems: 'center',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
    },
});