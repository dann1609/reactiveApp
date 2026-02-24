import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/slice'
import { persistenceMiddleware } from './middleware/persistence'

export default configureStore({
    reducer: {
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(persistenceMiddleware),
})