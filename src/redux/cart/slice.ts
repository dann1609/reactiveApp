import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../models/product';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {} as Record<string, number>,
        relatedProducts: {} as Record<string, IProduct>,
    },
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const { cartItem, product, quantity } = action.payload;
            state.cart[`${cartItem.productId}-${cartItem.variantId}`] = (state.cart[`${cartItem.productId}-${cartItem.variantId}`] || 0) + quantity;
            state.relatedProducts[cartItem.productId] = product;
        },
        reloadCart: (state, action: PayloadAction<any>) => {
            const { cart, relatedProducts } = action.payload;
            state.cart = cart;
            state.relatedProducts = relatedProducts;
        },
    },
})

export const { addToCart, reloadCart } = cartSlice.actions

export default cartSlice.reducer
