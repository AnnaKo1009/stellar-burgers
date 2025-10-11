import { rootReducer } from '../services/store';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние в сторе при неизвестном экшене', () => {
    const actualInitialState = rootReducer(undefined, { type: '@@INIT' });

    const stateAfterUnknownAction = rootReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(stateAfterUnknownAction).toEqual(actualInitialState);
  });
});