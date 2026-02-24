import { useEffect, useState } from "react";
import { IProduct } from "../models/product";
import { getProductsFromApi } from "../services/products";

export function useApiProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null)
        setProducts([])
        getProductsFromApi().then((data) => {
            setProducts(data);
            setLoading(false);
            setError(null);
        }).catch((error) => {
            setProducts([])
            setError(error);
            setLoading(false);
        });
    }, []);

    return { products, loading, error };
}