import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook
} from 'react-redux';
import userReducer from '../slices/userSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import feedReducer from '../slices/feedSlice';
import orderReducer from '../slices/orderSlice';
import constructorReducer from '../slices/constructorSlice';

// Собираем Root Reducer
export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
