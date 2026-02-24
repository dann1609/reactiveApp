import { Text } from "react-native";
import { Layout } from "../../components";
import { useEffect } from "react";
import { getProductsFromApi } from "../../services/products";

export default function HomeScreen() {

    useEffect(() => {
        getProductsFromApi();
    }, []);

    return (
        <Layout
            disableBottomInset
            noScroll
        >
            <Text>Home</Text>
        </Layout>
    );
}