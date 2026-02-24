import { Text } from "react-native";
import { Layout } from "../../components";
import { useEffect, useState } from "react";
import { getProductsFromApi } from "../../services/products";
import { IProduct } from "../../models/product";
import ProductCard from "../../components/productCard/ProductCard";

export default function HomeScreen() {

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        getProductsFromApi().then((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <Layout
            disableBottomInset
            noScroll
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Layout>
    );
}