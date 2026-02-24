import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/slice";
import { selectCart, selectRelatedProducts } from "../redux/cart/selectors";

export function useCart() {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const relatedProducts = useSelector(selectRelatedProducts);

    const getTotalItems = () => {
        return Object.values(cart).reduce((acc: number, val: any) => acc + val, 0);
    };

    const getMaxPossibleQuantity = (product: any, selectedVariant: any) => {
        const alreadySelected = cart[`${product.id}-${selectedVariant?.id}`] || 0;
        return Math.max(0, (selectedVariant?.quantityAvailable || 0) - alreadySelected)
    };

    const addItemsToCart = (cartItem: any, product: any, quantity: number) => {
        dispatch(addToCart({ cartItem, product, quantity }));
    };

    const getCartItemsData = useMemo(() => {
        const data = Object.entries(cart).map(([key, quantity]) => {
            const [productId, variantId] = key.split('-');
            const product = relatedProducts[productId];
            const variant = product?.variants.find(v => v.id === variantId);
            return {
                key,
                product,
                variant,
                quantity: quantity as number,
            };
        }).filter(item => item.product && item.variant && item.quantity > 0);

        return () => data;
    }, [cart, relatedProducts]);

    const getTotal = useMemo(() => {
        const items = getCartItemsData();
        const subtotal = items.reduce((acc, item) => {
            const price = parseFloat(item.variant?.price.amount || "0");
            return acc + (price * item.quantity);
        }, 0);

        const currencyCode = items[0]?.variant?.price.currencyCode || "USD";

        const totals = {
            subtotal: `${subtotal.toFixed(2)} ${currencyCode}`,
        };

        return () => totals;
    }, [getCartItemsData]);

    return [
        cart,
        {
            getMaxPossibleQuantity,
            getTotalItems,
            addItemsToCart,
            getCartItemsData,
            getTotal,
        }
    ];
}