import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../../components";
import { IProduct } from "../../models/product";
import { useTheme } from "../../theme";

interface ProductDetailsProps {
    product: IProduct | null;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const { colors } = useTheme();

    if (!product) {
        return (
            <View style={styles.emptyContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const imageUrl = product.images[0]?.url;
    const price = `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            <View style={styles.content}>
                <Text variant="primary" style={styles.vendor}>{product.vendor}</Text>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{price}</Text>

                <View style={styles.divider} />

                {product.options.map((option) => (
                    <View key={option.id} style={styles.optionSection}>
                        <Text style={styles.optionName}>{option.name}</Text>
                        <View style={styles.optionValues}>
                            {option.values.map((value) => (
                                <View
                                    key={value}
                                    style={[styles.chip, { borderColor: colors.border }]}
                                >
                                    <Text style={styles.chipText}>{value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>

                <TouchableOpacity
                    style={[styles.buyButton, { backgroundColor: colors.primary || '#000' }]}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buyButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
    },
    emptyContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    content: {
        padding: 24,
    },
    vendor: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
        opacity: 0.7,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#00000010',
        marginVertical: 20,
    },
    optionSection: {
        marginBottom: 20,
    },
    optionName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        textTransform: 'capitalize',
    },
    optionValues: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        minWidth: 50,
        alignItems: 'center',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.8,
        marginBottom: 30,
    },
    buyButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});