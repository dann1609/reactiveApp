import cartReducer, { addToCart, reloadCart } from '../src/redux/cart/slice';
import { IProduct } from '../src/models/product';

const mockProduct: IProduct = {
    id: 'prod-1',
    title: 'Test Product',
    // ... other fields
} as any;

describe('Cart Redux Slice', () => {
    const initialState = {
        cart: {},
        relatedProducts: {},
    };

    it('should return the initial state', () => {
        expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addToCart', () => {
        const cartItem = { productId: 'prod-1', variantId: 'var-1' };
        const quantity = 2;

        const actual = cartReducer(initialState, addToCart({ cartItem, product: mockProduct, quantity }));

        expect(actual.cart['prod-1-var-1']).toBe(2);
        expect(actual.relatedProducts['prod-1']).toEqual(mockProduct);
    });

    it('should increment quantity if item already exists in cart', () => {
        const stateWithItem = {
            cart: { 'prod-1-var-1': 1 },
            relatedProducts: { 'prod-1': mockProduct },
        };
        const cartItem = { productId: 'prod-1', variantId: 'var-1' };

        const actual = cartReducer(stateWithItem, addToCart({ cartItem, product: mockProduct, quantity: 2 }));

        expect(actual.cart['prod-1-var-1']).toBe(3);
    });

    it('should handle reloadCart', () => {
        const persistedState = {
            cart: { 'prod-2-var-2': 5 },
            relatedProducts: { 'prod-2': { id: 'prod-2' } as any },
        };

        const actual = cartReducer(initialState, reloadCart(persistedState));

        expect(actual.cart).toEqual(persistedState.cart);
        expect(actual.relatedProducts).toEqual(persistedState.relatedProducts);
    });
});
