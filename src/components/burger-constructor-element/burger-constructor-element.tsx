import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    // Перемещаем начинку вверх
    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredientUp(ingredient.id));
      }
    };

    // Перемещаем начинку вниз
    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredientDown(ingredient.id));
      }
    };

    // Удаляем начинку
    const handleClose = () => {
      dispatch(deleteIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
