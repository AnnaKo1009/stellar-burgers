import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '../utils/burger-api';
import { TOrder, TOrdersData } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  feedData: TOrdersData | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  feedData: null,
  loading: false,
  error: null
};

export const getFeed = createAsyncThunk('feed/getFeed', async () => {
  const data = await getFeedsApi();
  return data;
});

export const getProfileOrders = createAsyncThunk(
  'feeds/getProfileOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeedError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feedData = action.payload;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось загрузить ленту';
      })
      .addCase(getProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось загрузить заказы';
      });
  }
});

export const { clearFeedError } = feedSlice.actions;

export default feedSlice.reducer;
