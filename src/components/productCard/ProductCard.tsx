import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { IProduct } from "../../models/product";
import { Text } from "../index.ts";
import { useTheme } from "@react-navigation/native";

export default function ProductCard({ product, onPress }: { product: IProduct, onPress: (product: IProduct) => void }) {
    const { colors } = useTheme();
    const imageUrl = product.images[0]?.url;
    const price = `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`;

    const onProductPressed = () => {
        onPress(product);
    }

    return (
        <TouchableOpacity
            key={product.id}
            activeOpacity={0.4}
            onPress={onProductPressed}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <View style={styles.content}>
                <Text variant="primary" style={styles.vendor}>{product.vendor}</Text>
                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '40%',
        borderRadius: 16,
        borderWidth: 1,
        marginHorizontal: 0,
        marginVertical: 10,
        overflow: 'hidden',
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        // Elevation for Android
        elevation: 5,
        zIndex: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1.2,
        backgroundColor: '#f0f0f0',
    },
    content: {
        padding: 16,
    },
    vendor: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
    },
});