import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Layout, Text, Button } from "../../components";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../theme";
import CartItem from "./CartItem";
import { useMemo } from "react";

export default function CartScreen() {
    const { colors } = useTheme();
    const [cart, { addItemsToCart, getTotalItems, getCartItemsData, getTotal, getMaxPossibleQuantity }] = useCart();

    const cartItemsData = getCartItemsData();

    const handleIncrement = (item: any) => {
        const maxPossibleQuantity = getMaxPossibleQuantity(item.product, item.variant);

        if (item.variant && item.product && maxPossibleQuantity >= 1) {
            addItemsToCart({ productId: item.product.id, variantId: item.variant.id }, item.product, 1);
        }
    };

    const handleDecrement = (item: any) => {
        addItemsToCart({ productId: item.product.id, variantId: item.variant.id }, item.product, -1);
    };

    const totals = getTotal();

    if (cartItemsData.length === 0) {
        return (
            <Layout>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet.</Text>
                </View>
            </Layout>
        );
    }

    return (
        <Layout
            disableBottomInset
            noScroll
            contentContainerStyle={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
                <Text style={styles.headerCount}>{getTotalItems()} items</Text>
            </View>

            <ScrollView style={styles.itemList} showsVerticalScrollIndicator={false}>
                {cartItemsData.map((item) => (
                    <CartItem
                        key={item.key}
                        product={item.product}
                        variant={item.variant!}
                        quantity={item.quantity}
                        onIncrement={() => handleIncrement(item)}
                        onDecrement={() => handleDecrement(item)}
                    />
                ))}
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>{totals.subtotal}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Shipping</Text>
                    <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>Free</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>{totals.subtotal}</Text>
                </View>
                <Button style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </Button>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
    },
    headerCount: {
        fontSize: 16,
        opacity: 0.5,
        fontWeight: '600',
    },
    itemList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    footer: {
        padding: 24,
        paddingBottom: 40,
        paddingTop: 16,
        borderTopWidth: 1
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 16,
        opacity: 0.6,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#00000005',
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '800',
    },
    checkoutButton: {
        height: 56,
        borderRadius: 28,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 16,
        opacity: 0.5,
        textAlign: 'center',
        lineHeight: 24,
    },
});