import store from '../services/store';

describe('rootReducer', () => {
  test('Возврат исходного состояния в сторе для неизвестного экшена', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      ingredients: {
        items: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      feed: {
        orders: [],
        feedData: null,
        loading: false,
        error: null
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        orderError: null
      }
    });
  });
});

