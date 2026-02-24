import { useMemo, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Button, ChipButton } from "../../components";
import { checkIfIsOptionValueAvailable, checkIfProductIsAvailable, getImageUrlFromVariantOrProduct, getPriceFromVariantOrProduct, IProduct } from "../../models/product";
import { useTheme } from "../../theme";

interface ProductDetailsProps {
    product: IProduct | null;
    onBack: () => void;
}

export default function ProductDetails({ product, onBack }: ProductDetailsProps) {
    const { colors } = useTheme();

    const initialOptions = useMemo(() => {
        if (!product || !product.variants.length) return {};
        const firstVariant = product.variants[0];
        const options: Record<string, string> = {};
        firstVariant.selectedOptions.forEach(opt => {
            options[opt.name] = opt.value;
        });
        return options;
    }, [product]);

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions);

    const selectedVariant = useMemo(() => {
        if (!product) return null;
        return product.variants.find(variant => {
            return variant.selectedOptions.every(opt => {
                return selectedOptions[opt.name] === opt.value;
            });
        }) || product.variants[0];
    }, [product, selectedOptions]);

    if (!product) {
        return (
            <View style={styles.emptyContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const imageUrl = getImageUrlFromVariantOrProduct(product, selectedVariant);
    const price = getPriceFromVariantOrProduct(product, selectedVariant);

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY < -60) {
            onBack();
        }
    };

    const onOptionSelect = (name: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isAvailable = checkIfProductIsAvailable(product, selectedVariant);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            <View style={styles.handleContainer}>
                <View style={styles.handle} />
            </View>
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

                {!isAvailable && (
                    <View style={styles.outOfStockBadge}>
                        <Text style={styles.outOfStockText}>Out of Stock</Text>
                    </View>
                )}

                <View style={styles.divider} />

                {product.options.map((option) => (
                    <View key={option.id} style={styles.optionSection}>
                        <Text style={styles.optionName}>{option.name}</Text>
                        <View style={styles.optionValues}>
                            {option.values.map((value) => {
                                const isSelected = selectedOptions[option.name] === value;
                                const isValueAvailable = checkIfIsOptionValueAvailable(product, selectedOptions, option.name, value);
                                return (
                                    <ChipButton
                                        key={value}
                                        value={value}
                                        onOptionSelect={onOptionSelect}
                                        option={option}
                                        isSelected={isSelected}
                                        isValueAvailable={isValueAvailable}
                                    />
                                );
                            })}
                        </View>
                    </View>
                ))}

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>

                <Button
                    disabled={!isAvailable}
                >
                    <Text style={styles.buyButtonText}>
                        {isAvailable ? 'Add to Cart' : 'Out of Stock'}
                    </Text>
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
    },
    outOfStockBadge: {
        backgroundColor: '#ff3b3020',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    outOfStockText: {
        color: '#ff3b30',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    handle: {
        width: 40,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#00000020',
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    description: {
        textAlign: 'justify',
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.8,
        marginBottom: 30,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});