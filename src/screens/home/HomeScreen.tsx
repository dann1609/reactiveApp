import { ActivityIndicator, StyleSheet } from "react-native";
import { Layout, Text } from "../../components";
import ProductCard from "../../components/productCard/ProductCard";
import { useApiProducts } from "../../hooks/useApiProducts";

export default function HomeScreen() {

    const { products, loading, error } = useApiProducts();

    return (
        <Layout
            contentContainerStyle={styles.container}
        >
            {loading && <ActivityIndicator size="large" color="#00ff00" />}
            {error && <Text style={styles.autoCenter}>Error: {error.message}</Text>}
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
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