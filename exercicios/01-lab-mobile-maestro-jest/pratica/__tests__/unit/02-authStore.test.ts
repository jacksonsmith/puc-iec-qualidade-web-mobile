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

  // 🧑‍🏫 1. FÁCIL — login válido
  it('1. login com credenciais válidas autentica e guarda o email', () => {
    const ok = useAuthStore.getState().login('aluno@puc.br', '1234');

    // TODO: expect(ok).toBe(true)
    // TODO: verifique isAuthenticated === true e email === 'aluno@puc.br'
  });

  // 🧑‍💻 2. FÁCIL — email inválido
  it('2. email sem @ NÃO autentica', () => {
    const ok = useAuthStore.getState().login('aluno.puc.br', '1234');

    // TODO: expect(ok).toBe(false)
    // TODO: isAuthenticated continua false e email continua null
  });

  // 🧑‍💻 3. 🔴 DESAFIO — senha curta
  it('3. senha com menos de 4 caracteres NÃO autentica', () => {
    // TODO: tente login('aluno@puc.br', '123') e verifique a recusa completa
  });

  // 🧑‍💻 4. 🔴 DESAFIO — logout
  it('4. logout limpa a sessão', () => {
    // TODO: faça login válido, chame logout(), verifique isAuthenticated e email
  });

  // 🧑‍💻 5. 🔴 DESAFIO — borda: senha só de espaços
  it('5. senha "     " (espaços) NÃO autentica', () => {
    // TODO: a regra usa password.trim() — prove que espaços não passam
  });
});
