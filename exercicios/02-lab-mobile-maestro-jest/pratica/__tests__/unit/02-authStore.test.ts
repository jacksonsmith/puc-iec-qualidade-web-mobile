// __tests__/unit/02-authStore.test.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — teste unitário do authStore
//
// Regra do store: email com "@" + senha de 4+ chars → autentica.
//
// Legenda:  🧑‍🏫 = professor faz no screencast · 🧑‍💻 = você faz sozinho
//           FÁCIL = arrange/act prontos, você escreve o expect
//           🔴 DESAFIO = você escreve o teste inteiro
// ─────────────────────────────────────────────────────────────────────────────

import { useAuthStore } from '@/store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: false, email: null });
  });

  it('1. login com credenciais válidas autentica e guarda o email', () => {
    const ok = useAuthStore.getState().login('aluno@puc.br', '1234');

    expect(ok).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().email).toBe('aluno@puc.br');
  });

  it('2. email sem @ NÃO autentica', () => {
    const ok = useAuthStore.getState().login('aluno.puc.br', '1234');

    expect(ok).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().email).toBeNull();
  });

  it('3. senha com menos de 4 caracteres NÃO autentica', () => {
    const ok = useAuthStore.getState().login('aluno@puc.br', '123');

    expect(ok).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().email).toBeNull();
  });

  it('4. logout limpa a sessão', () => {
    const { login, logout } = useAuthStore.getState();

    login('aluno@puc.br', '1234');
    logout();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().email).toBeNull();
  });

  it('5. senha "     " (espaços) NÃO autentica', () => {
    const ok = useAuthStore.getState().login('aluno@puc.br', '     ');

    expect(ok).toBe(false);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().email).toBeNull();
  });
});
