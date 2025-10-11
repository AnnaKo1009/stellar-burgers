import constructorReducer, {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../slices/constructorSlice';

const mockBun = {
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
};

const mockMain = {
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
};

const mockSauce = {
  _id: '3',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

describe('constructorSlice', () => {
  it('обрабатывает экшен добавления булки', () => {
    const state = constructorReducer(undefined, addIngredient(mockBun));

    expect(state.bun).toBeTruthy();
    expect(state.bun!.name).toBe('Краторная булка N-200i');
    expect(state.bun).toHaveProperty('id');
  });

  it('обрабатывает экшен добавления начинки', () => {
    const state = constructorReducer(undefined, addIngredient(mockMain));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('обрабатывает экшен удаления ингредиента', () => {
    const stateWithIngredients = constructorReducer(
      undefined,
      addIngredient(mockMain)
    );
    const ingredientId = stateWithIngredients.ingredients[0].id;

    const stateAfterDelete = constructorReducer(
      stateWithIngredients,
      deleteIngredient(ingredientId)
    );

    expect(stateAfterDelete.ingredients).toHaveLength(0);
  });

  it('обрабатывает экшен изменения порядка ингредиентов - перемещение вверх', () => {
    const stateWithTwoIngredients = constructorReducer(
      constructorReducer(undefined, addIngredient(mockMain)),
      addIngredient(mockSauce)
    );

    const secondIngredientId = stateWithTwoIngredients.ingredients[1].id;
    const stateAfterMove = constructorReducer(
      stateWithTwoIngredients,
      moveIngredientUp(secondIngredientId)
    );

    expect(stateAfterMove.ingredients[0].name).toBe('Соус Spicy-X');
    expect(stateAfterMove.ingredients[1].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('обрабатывает экшен изменения порядка ингредиентов - перемещение вниз', () => {
    const stateWithTwoIngredients = constructorReducer(
      constructorReducer(undefined, addIngredient(mockMain)),
      addIngredient(mockSauce)
    );

    const firstIngredientId = stateWithTwoIngredients.ingredients[0].id;
    const stateAfterMove = constructorReducer(
      stateWithTwoIngredients,
      moveIngredientDown(firstIngredientId)
    );

    expect(stateAfterMove.ingredients[0].name).toBe('Соус Spicy-X');
    expect(stateAfterMove.ingredients[1].name).toBe(
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('обрабатывает экшен очистки конструктора', () => {
    const stateWithData = constructorReducer(
      constructorReducer(undefined, addIngredient(mockBun)),
      addIngredient(mockMain)
    );

    const stateAfterClear = constructorReducer(
      stateWithData,
      clearConstructor()
    );

    expect(stateAfterClear.bun).toBeNull();
    expect(stateAfterClear.ingredients).toHaveLength(0);
  });
});
