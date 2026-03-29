import userReducer, {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  checkUserAuth,
  clearError
} from '../slices/userSlice';

const mockUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('userSlice', () => {
  it('устанавливает isLoading в true при начале логина', () => {
    const state = userReducer(undefined, { type: loginUser.pending.type });
    
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('добавляет пользователя и устанавливает isLoading в false при успешном логине', () => {
    const state = userReducer(
      { user: null, isAuthChecked: false, isLoading: true, error: null },
      { type: loginUser.fulfilled.type, payload: mockUser }
    );
    
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('устанавливает ошибку и isLoading в false при неудачном логине', () => {
    const errorMessage = 'Ошибка входа';
    const state = userReducer(
      { user: null, isAuthChecked: false, isLoading: true, error: null },
      { 
        type: loginUser.rejected.type, 
        payload: errorMessage
      }
    );
    
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.user).toBeNull();
  });

  it('устанавливает isLoading в true при начале регистрации', () => {
    const state = userReducer(undefined, { type: registerUser.pending.type });
    
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('добавляет пользователя и устанавливает isLoading в false при успешной регистрации', () => {
    const state = userReducer(
      { user: null, isAuthChecked: false, isLoading: true, error: null },
      { type: registerUser.fulfilled.type, payload: mockUser }
    );
    
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('устанавливает isLoading в true при начале проверки авторизации', () => {
    const state = userReducer(undefined, { type: checkUserAuth.pending.type });
    
    expect(state.isLoading).toBe(true);
  });

  it('устанавливает isAuthChecked в true и добавляет пользователя при успешной проверке авторизации', () => {
    const state = userReducer(
      { user: null, isAuthChecked: false, isLoading: true, error: null },
      { type: checkUserAuth.fulfilled.type, payload: mockUser }
    );
    
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('устанавливает isAuthChecked в true при неудачной проверке авторизации', () => {
    const state = userReducer(
      { user: null, isAuthChecked: false, isLoading: true, error: null },
      { type: checkUserAuth.rejected.type }
    );
    
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  it('очищает пользователя при выходе', () => {
    const stateWithUser = {
      user: mockUser,
      isAuthChecked: true,
      isLoading: false,
      error: null
    };
    
    const stateAfterLogout = userReducer(stateWithUser, { type: logoutUser.fulfilled.type });
    
    expect(stateAfterLogout.user).toBeNull();
    expect(stateAfterLogout.error).toBeNull();
  });

  it('обновляет данные пользователя', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const state = userReducer(
      { user: mockUser, isAuthChecked: true, isLoading: false, error: null },
      { type: updateUser.fulfilled.type, payload: updatedUser }
    );
    
    expect(state.user).toEqual(updatedUser);
    expect(state.user!.name).toBe('Updated User');
  });

  it('обрабатывает экшен очистки ошибки', () => {
    const stateWithError = {
      user: null,
      isAuthChecked: false,
      isLoading: false,
      error: 'Какая-то ошибка'
    };
    
    const stateAfterClear = userReducer(stateWithError, clearError());
    
    expect(stateAfterClear.error).toBeNull();
  });
});