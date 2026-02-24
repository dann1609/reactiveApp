import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: any) => state.cart

export const selectCartList = createSelector(selectSelf, (state) => state.cart)