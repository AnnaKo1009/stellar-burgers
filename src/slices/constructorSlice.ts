import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = {
          ...action.payload,
          id: uuidv4()
        };
      } else {
        state.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (ingredientIndex > 0) {
        const temp = state.ingredients[ingredientIndex - 1];
        state.ingredients[ingredientIndex - 1] =
          state.ingredients[ingredientIndex];
        state.ingredients[ingredientIndex] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const ingredientIndex = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (ingredientIndex < state.ingredients.length - 1) {
        const temp = state.ingredients[ingredientIndex + 1];
        state.ingredients[ingredientIndex + 1] =
          state.ingredients[ingredientIndex];
        state.ingredients[ingredientIndex] = temp;
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
