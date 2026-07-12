// src/store/auth.ts
//
// Autenticação fake persistida em localStorage — é exatamente o que o
// storageState do Playwright captura e reinjeta (Prática 1 / auth.setup).

const KEY = 'cinefav-auth';

export const VALID_EMAIL = 'aluno@puc.br';
export const VALID_PASSWORD = '1234';

export interface AuthUser {
  email: string;
}

export function login(email: string, password: string): AuthUser | null {
  if (email.trim().toLowerCase() !== VALID_EMAIL || password !== VALID_PASSWORD) {
    return null;
  }
  const user: AuthUser = { email: VALID_EMAIL };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem(KEY);
}

export function currentUser(): AuthUser | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}
