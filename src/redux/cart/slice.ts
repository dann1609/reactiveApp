import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {},
        relatedProducts: {},
    },
    reducers: {
    },
})

export const { } = cartSlice.actions

export default cartSlice.reducer
