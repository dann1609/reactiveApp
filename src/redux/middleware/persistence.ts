import { Middleware } from '@reduxjs/toolkit';
import storageService from '../../services/storage';

export const persistenceMiddleware: Middleware = store => next => action => {
    const result = next(action);
    const state = store.getState();

    // Only sync if the action is from the reminders slice
    if ((action as any).type?.startsWith('cart/')) {
        storageService.setItem('cart', state.cart);
    }

    return result;
};
