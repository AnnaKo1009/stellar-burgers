import feedReducer, {
  getFeed,
  getProfileOrders,
  clearFeedError
} from '../slices/feedSlice';

const mockFeedData = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345,
      ingredients: ['1', '2']
    }
  ],
  total: 100,
  totalToday: 10
};

const mockProfileOrders = [
  {
    _id: '2',
    status: 'pending',
    name: 'Люминесцентный бургер',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
    number: 12346,
    ingredients: ['3', '4']
  }
];

describe('feedSlice', () => {
  it('устанавливает loading в true при начале запроса ленты заказов', () => {
    const state = feedReducer(undefined, { type: getFeed.pending.type });
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('добавляет данные ленты и устанавливает loading в false при успешном запросе', () => {
    const state = feedReducer(
      { orders: [], feedData: null, loading: true, error: null },
      { type: getFeed.fulfilled.type, payload: mockFeedData }
    );
    
    expect(state.loading).toBe(false);
    expect(state.feedData).toEqual(mockFeedData);
    expect(state.error).toBeNull();
  });

  it('устанавливает ошибку и loading в false при неудачном запросе ленты', () => {
    const errorMessage = 'Ошибка загрузки ленты';
    const state = feedReducer(
      { orders: [], feedData: null, loading: true, error: null },
      { 
        type: getFeed.rejected.type, 
        error: { message: errorMessage } 
      }
    );
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.feedData).toBeNull();
  });

  it('устанавливает loading в true при начале запроса заказов профиля', () => {
    const state = feedReducer(undefined, { type: getProfileOrders.pending.type });
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('добавляет заказы профиля и устанавливает loading в false при успешном запросе', () => {
    const state = feedReducer(
      { orders: [], feedData: null, loading: true, error: null },
      { type: getProfileOrders.fulfilled.type, payload: mockProfileOrders }
    );
    
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockProfileOrders);
    expect(state.error).toBeNull();
  });

  it('устанавливает ошибку и loading в false при неудачном запросе заказов профиля', () => {
    const errorMessage = 'Ошибка загрузки заказов';
    const state = feedReducer(
      { orders: [], feedData: null, loading: true, error: null },
      { 
        type: getProfileOrders.rejected.type, 
        error: { message: errorMessage } 
      }
    );
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.orders).toHaveLength(0);
  });

  it('обрабатывает экшен очистки ошибки', () => {
    const stateWithError = {
      orders: [],
      feedData: null,
      loading: false,
      error: 'Какая-то ошибка'
    };
    
    const stateAfterClear = feedReducer(stateWithError, clearFeedError());
    
    expect(stateAfterClear.error).toBeNull();
  });
});