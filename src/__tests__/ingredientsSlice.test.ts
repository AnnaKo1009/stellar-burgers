import ingredientsReducer, {
  fetchIngredients,
  clearIngredientsError
} from '../slices/ingredientsSlice';

const mockIngredients = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  },
  {
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  }
];

describe('ingredientsSlice', () => {
  it('устанавливает loading в true при начале запроса ингредиентов', () => {
    const state = ingredientsReducer(undefined, { type: fetchIngredients.pending.type });
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('добавляет ингредиенты и устанавливает loading в false при успешном запросе', () => {
    const state = ingredientsReducer(
      { items: [], loading: true, error: null },
      { type: fetchIngredients.fulfilled.type, payload: mockIngredients }
    );
    
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('устанавливает ошибку и loading в false при неудачном запросе', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const state = ingredientsReducer(
      { items: [], loading: true, error: null },
      { 
        type: fetchIngredients.rejected.type, 
        payload: errorMessage 
      }
    );
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.items).toHaveLength(0);
  });

  it('обрабатывает экшен очистки ошибки', () => {
    const stateWithError = {
      items: [],
      loading: false,
      error: 'Какая-то ошибка'
    };
    
    const stateAfterClear = ingredientsReducer(stateWithError, clearIngredientsError());
    
    expect(stateAfterClear.error).toBeNull();
  });
});