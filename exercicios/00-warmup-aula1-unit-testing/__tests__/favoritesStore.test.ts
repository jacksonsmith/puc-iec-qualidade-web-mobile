// __tests__/favoritesStore.test.ts
//
// 🔵 NÃO AVALIATIVO — esquenta da Aula 1, faz junto em sala.
//    Marca por it(): 🧑‍🏫 = a gente faz junto · 🧑‍💻 = você tenta primeiro.
//
// Escreva os testes da favoritesStore — a MESMA store usada tanto no
// FavoriteButton.native.tsx (mobile) quanto no FavoriteButton.web.tsx (web).
//
// Store Zustand é singleton: precisa resetar o estado entre testes
// (senão um teste contamina o outro). Use o beforeEach abaixo.
//
// Acesse estado e actions com useFavoritesStore.getState():
//   useFavoritesStore.getState().add(1)
//   useFavoritesStore.getState().ids            // → [1]
//   useFavoritesStore.getState().isFavorite(1)  // → true

import { useFavoritesStore } from '../src/store/favoritesStore';

beforeEach(() => {
  useFavoritesStore.setState({ ids: [] });
});

// Atalho pra ler estado e actions fora de componente:
const s = () => useFavoritesStore.getState();

// Creation Method: "prepara o cenário" (Arrange) falando o domínio,
// em vez de repetir s().add(...) em cada teste.
const comFavoritos = (...ids: number[]) => ids.forEach((id) => s().add(id));

// FÁCEIS (1-4): Arrange e Act já escritos — complete SÓ o expect (começam vermelhos → verde).
// 🔴 DESAFIOS (5-6): ainda it.todo — escreva o teste inteiro a partir da dica.

describe('favoritesStore', () => {
  it('1. favoritar adiciona o filme à lista (add)', () => {   // 🧑‍🏫 em aula
    // Act
    s().add(1);
    // Assert — complete:
    expect(s().ids).toEqual(/* TODO: qual array? */);
  });

  it('2. desfavoritar tira o filme da lista (remove)', () => {   // 🧑‍🏫 em aula
    // Arrange
    comFavoritos(1);
    // Act
    s().remove(1);
    // Assert — complete:
    expect(s().ids).toEqual(/* TODO */);
  });

  it('3. sei se um filme está favoritado (isFavorite)', () => {   // 🧑‍💻 você tenta
    // Arrange
    comFavoritos(1);
    // Assert — complete (true ou false?):
    expect(s().isFavorite(1)).toBe(/* TODO */);
    expect(s().isFavorite(99)).toBe(/* TODO */);
  });

  it('4. limpar esvazia todos os favoritos (clear)', () => {   // 🧑‍💻 você tenta
    // Arrange
    comFavoritos(1, 2);
    // Act
    s().clear();
    // Assert — complete:
    expect(s().ids).toEqual(/* TODO */);
  });

  // 🔴 DESAFIO: chamar add(1) DUAS vezes não pode duplicar (ids continua [1]).
  //    Escreva Act + Assert do zero.
  it.todo('5. favoritar o mesmo filme 2× não duplica (add)');   // 🧑‍💻 você tenta

  // 🔴 DESAFIO: toggle(1) na lista vazia ADICIONA; chamar toggle(1) de novo REMOVE.
  //    Faça as 2 verificações (após o 1º toggle = [1]; após o 2º = []).
  it.todo('6. o ♥ alterna favoritar/desfavoritar (toggle)');   // 🧑‍💻 você tenta
});
