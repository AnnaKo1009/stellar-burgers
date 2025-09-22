import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getOrderByNumber } from '../../slices/orderSlice';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getProfileOrders } from '../../slices/feedSlice';
import {
  selectFeedLoading,
  selectProfileOrders
} from '../../services/selectors';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectProfileOrders);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
