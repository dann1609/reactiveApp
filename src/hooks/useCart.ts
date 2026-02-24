import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/slice";
import { selectCart } from "../redux/cart/selectors";

export function useCart() {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    const getMaxPossibleQuantity = (product: any, selectedVariant: any) => {
        const alreadySelected = cart[`${product.id}-${selectedVariant?.id}`] || 0;
        return Math.max(0, (selectedVariant?.quantityAvailable || 0) - alreadySelected)
    };

    const addItemsToCart = (cartItem: any, product: any, quantity: number) => {
        dispatch(addToCart({ cartItem, product, quantity }));
    };

    return [
        cart,
        {
            getMaxPossibleQuantity,
            addItemsToCart,
        }
    ];
}