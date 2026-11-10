import { useFavoritesStore } from '../../src/store/favoritesStore';

describe('FavoriteStore Unit Tests', () => {
  beforeEach(() => {
    useFavoritesStore.getState().clear();
  });

  it('1. deve iniciar com a lista de favoritos vazia', () => {
    const state = useFavoritesStore.getState();
    expect(state.ids).toEqual([]);
  });

  it('2. deve adicionar e remover um filme dos favoritos com sucesso', () => {
    // Adiciona
    useFavoritesStore.getState().add(603);
    let state = useFavoritesStore.getState();
    expect(state.ids).toContain(603);

    // Remove
    useFavoritesStore.getState().remove(603);
    state = useFavoritesStore.getState();
    expect(state.ids).not.toContain(603);
  });

  it('3. deve verificar corretamente se um filme é favorito', () => {
    useFavoritesStore.getState().add(603);

    const isFav = useFavoritesStore.getState().isFavorite(603);
    expect(isFav).toBe(true);
  });
});