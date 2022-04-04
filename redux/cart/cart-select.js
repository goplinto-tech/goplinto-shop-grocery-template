import { createSelector } from "reselect";

const selectCart = state => state.cart

const selectCartQuantity = createSelector([selectCart], item => item)