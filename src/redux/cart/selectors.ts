import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: any) => state.cart

export const selectCart = createSelector(selectSelf, (state) => state.cart)