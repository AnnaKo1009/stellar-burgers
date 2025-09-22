import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '@utils-types';

interface OrdersState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
}

const initialState: OrdersState = {
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientsIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientsIds);
      return response.order;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка создания заказа'
      );
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
      state.orderError = null;
    },
    clearOrderError: (state) => {
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.orderError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
      })
      // getOrderByNumber
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.orderError = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload as string;
      });
  }
});

export const { clearOrder, clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;
