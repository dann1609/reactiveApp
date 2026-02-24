import { useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Layout, Text } from "../../components";
import ProductCard from "../../components/productCard/ProductCard";
import { useApiProducts } from "../../hooks/useApiProducts";
import SliderModal from "../../components/modal/SliderModal";
import { IProduct } from "../../models/product";
import ProductDetails from "../product/ProductDetailsFragment";
import { useTheme } from "../../theme";

export default function HomeScreen() {

    const { colors } = useTheme();
    const { products, loading, error } = useApiProducts();
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

    const closeModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    }

    const onProductPressed = (product: IProduct) => {
        setSelectedProduct(product);
        setModalVisible(true);
    }

    return (
        <Layout
            contentContainerStyle={styles.container}
        >
            {loading && <ActivityIndicator size="large" color={colors.primary} />}
            {error && <Text style={styles.autoCenter}>Error: {error.message}</Text>}
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onPress={onProductPressed} />
            ))}
            <SliderModal visible={modalVisible} onRequestClose={closeModal}>
                <ProductDetails product={selectedProduct} onBack={closeModal} />
            </SliderModal>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    autoCenter: {
        width: '100%',
        textAlign: 'center',
    }
});