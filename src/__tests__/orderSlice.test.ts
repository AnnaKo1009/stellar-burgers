import orderReducer, {
  createOrder,
  getOrderByNumber,
  clearOrder,
  clearOrderError
} from '../slices/orderSlice';

const mockOrder = {
  _id: '1',
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['1', '2']
};

describe('orderSlice', () => {
  it('устанавливает orderRequest в true при начале создания заказа', () => {
    const state = orderReducer(undefined, { type: createOrder.pending.type });
    
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('добавляет данные заказа и устанавливает orderRequest в false при успешном создании', () => {
    const state = orderReducer(
      { orderRequest: true, orderModalData: null, orderError: null },
      { type: createOrder.fulfilled.type, payload: mockOrder }
    );
    
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.orderError).toBeNull();
  });

  it('устанавливает ошибку и orderRequest в false при неудачном создании заказа', () => {
    const errorMessage = 'Ошибка создания заказа';
    const state = orderReducer(
      { orderRequest: true, orderModalData: null, orderError: null },
      { 
        type: createOrder.rejected.type, 
        payload: errorMessage
      }
    );
    
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
    expect(state.orderModalData).toBeNull();
  });

  it('устанавливает orderRequest в true при начале запроса заказа по номеру', () => {
    const state = orderReducer(undefined, { type: getOrderByNumber.pending.type });
    
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('добавляет данные заказа и устанавливает orderRequest в false при успешном запросе по номеру', () => {
    const state = orderReducer(
      { orderRequest: true, orderModalData: null, orderError: null },
      { type: getOrderByNumber.fulfilled.type, payload: mockOrder }
    );
    
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.orderError).toBeNull();
  });

  it('устанавливает ошибку и orderRequest в false при неудачном запросе заказа по номеру', () => {
    const errorMessage = 'Ошибка получения заказа';
    const state = orderReducer(
      { orderRequest: true, orderModalData: null, orderError: null },
      { 
        type: getOrderByNumber.rejected.type, 
        payload: errorMessage
      }
    );
    
    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe(errorMessage);
    expect(state.orderModalData).toBeNull();
  });

  it('обрабатывает экшен очистки заказа', () => {
    const stateWithOrder = {
      orderRequest: false,
      orderModalData: mockOrder,
      orderError: null
    };
    
    const stateAfterClear = orderReducer(stateWithOrder, clearOrder());
    
    expect(stateAfterClear.orderModalData).toBeNull();
    expect(stateAfterClear.orderError).toBeNull();
  });

  it('обрабатывает экшен очистки ошибки', () => {
    const stateWithError = {
      orderRequest: false,
      orderModalData: null,
      orderError: 'Какая-то ошибка'
    };
    
    const stateAfterClear = orderReducer(stateWithError, clearOrderError());
    
    expect(stateAfterClear.orderError).toBeNull();
  });
});