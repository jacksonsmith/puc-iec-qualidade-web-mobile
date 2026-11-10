import { useAuthStore } from '../../src/store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      email: null,
      isAuthenticated: false,
    });
  });

  test('1. deve iniciar com estado deslogado', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.email).toBeNull();
  });

  test('2. deve realizar login com sucesso', () => {
    useAuthStore.getState().login('aluno@puc.br', '1234');
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.email).toBe('aluno@puc.br');
  });

  test('3. deve persistir o email fornecido no login', () => {
    useAuthStore.getState().login('outro@puc.br', '9999');
    const state = useAuthStore.getState();
    expect(state.email).toBe('outro@puc.br');
  });

  test('4. deve realizar logout corretamente', () => {
    useAuthStore.getState().login('aluno@puc.br', '1234');
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.email).toBeNull();
  });

  test('5. deve manter o estado de autenticação consistente', () => {
    useAuthStore.getState().login('aluno@puc.br', '1234');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});