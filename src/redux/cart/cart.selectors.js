import { createSelector } from 'reselect';

//input selector to create small slice of state object
const selectCart = state => state.cart;

//requires two arguments
export const selectCartItems = createSelector(
  //first argument is an array/collection of selectors
  //can also be a series of comma separated arguments ex. arg1, arg2
  //can be any type of selector, either the input selector above, or an output selector like this one
  [selectCart],
  //second argument is a function that returns the value we want from selector
  //can take multiple selectors
  //must order the arguments in the same order as they are in the array above
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems], 
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) => 
        accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);