import { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { createOrder, clearOrder } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import {
  selectConstructorItems,
  selectIsUserAuthenticated,
  selectOrderRequest,
  selectOrderModalData,
  selectOrderError
} from '../../services/selectors';
import { clearConstructor } from '../../slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const orderError = useSelector(selectOrderError);

  useEffect(() => {
    // Очищаем заказ если он есть (на случай возврата на страницу)
    if (orderModalData) {
      dispatch(clearOrder());
    }
  }, [dispatch]);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login', { replace: true });
    }

    // Проверяем, что есть булка и ингредиенты
    if (constructorItems.bun && constructorItems.ingredients.length) {
      const ingredientsIds = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(
        createOrder([
          constructorItems.bun._id,
          ...ingredientsIds,
          constructorItems.bun._id
        ])
      );
    }
  };

  const handleCloseOrderModal = () => {
    dispatch(clearOrder());
    if (orderModalData) {
      dispatch(clearConstructor());
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
