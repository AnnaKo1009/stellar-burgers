import { RootState } from './store';

// Constructor selectors
export const selectConstructorItems = (state: RootState) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});

// User selectors
export const selectIsUserAuthenticated = (state: RootState) =>
  state.user.user !== null;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUser = (state: RootState) => state.user.user;
export const selectAuthLoading = (state: RootState) => state.user.isLoading;
export const selectAuthError = (state: RootState) => state.user.error;

// Order selectors
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;
export const selectOrderError = (state: RootState) => state.order.orderError;

// Ingredients selectors
export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;

// Feed selectors
export const selectFeed = (state: RootState) => state.feed.feedData;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const selectProfileOrders = (state: RootState) => state.feed.orders;
