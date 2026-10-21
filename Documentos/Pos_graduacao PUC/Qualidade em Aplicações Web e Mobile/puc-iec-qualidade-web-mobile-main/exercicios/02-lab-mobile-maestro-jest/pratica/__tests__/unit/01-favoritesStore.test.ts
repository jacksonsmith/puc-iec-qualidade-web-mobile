// __tests__/unit/01-favoritesStore.test.ts
// ─────────────────────────────────────────────────────────────────────────────
// 📘 MODELO (resolvido) — teste unitário de store Zustand
//
// Este arquivo já vem pronto: leia e entenda o padrão antes de fazer o 02.
// Ponto-chave: store Zustand é ESTADO GLOBAL — sem reset no beforeEach,
// um teste vaza estado pro outro (test pollution).
// ─────────────────────────────────────────────────────────────────────────────

import { useFavoritesStore } from '@/store/favoritesStore';

describe('favoritesStore', () => {
  beforeEach(() => {
    // reset do estado global entre testes — SEMPRE
    useFavoritesStore.setState({ ids: [] });
  });

  it('1. começa vazio', () => {
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });

  it('2. add adiciona um id', () => {
    useFavoritesStore.getState().add(603);
    expect(useFavoritesStore.getState().ids).toEqual([603]);
  });

  it('3. add é idempotente (não duplica id já favoritado)', () => {
    const { add } = useFavoritesStore.getState();
    add(603);
    add(603);
    expect(useFavoritesStore.getState().ids).toEqual([603]);
  });

  it('4. remove tira só o id pedido', () => {
    const { add, remove } = useFavoritesStore.getState();
    add(603);
    add(155);
    remove(603);
    expect(useFavoritesStore.getState().ids).toEqual([155]);
  });

  it('5. toggle alterna: fora → dentro → fora', () => {
    const { toggle } = useFavoritesStore.getState();
    toggle(603);
    expect(useFavoritesStore.getState().isFavorite(603)).toBe(true);
    toggle(603);
    expect(useFavoritesStore.getState().isFavorite(603)).toBe(false);
  });

  it('6. clear esvazia tudo', () => {
    const { add, clear } = useFavoritesStore.getState();
    add(603);
    add(155);
    clear();
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });
});
