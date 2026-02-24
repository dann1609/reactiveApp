import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../../components";
import { getImageUrlFromVariantOrProduct, getPriceFromVariantOrProduct, IProduct, IVariant } from "../../models/product";
import { useTheme } from "../../theme";

interface CartItemProps {
    product: IProduct;
    variant: IVariant;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export default function CartItem({ product, variant, quantity, onIncrement, onDecrement }: CartItemProps) {
    const { colors } = useTheme();

    const imageUrl = getImageUrlFromVariantOrProduct(product, variant);
    const priceText = getPriceFromVariantOrProduct(product, variant);

    return (
        <View style={[styles.container, { borderBottomColor: colors.border }]}>
            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
                <Text style={styles.variant} numberOfLines={1}>
                    {variant.title !== "Default Title" ? variant.title : product.vendor}
                </Text>
                <Text style={styles.price}>{priceText}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    onPress={onDecrement}
                    style={[styles.quantityButton, { borderColor: colors.border }]}
                >
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                    onPress={onIncrement}
                    style={[styles.quantityButton, { borderColor: colors.border }]}
                >
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
    },
    details: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    variant: {
        fontSize: 14,
        opacity: 0.6,
        marginBottom: 8,
    },
    price: {
        fontSize: 15,
        fontWeight: '600',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '700',
        minWidth: 20,
        textAlign: 'center',
    },
});
