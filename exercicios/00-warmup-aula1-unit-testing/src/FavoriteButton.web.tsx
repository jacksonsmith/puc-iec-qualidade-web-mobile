// FavoriteButton.web.tsx — versão WEB (React), escrita DEPOIS da mobile.
//
// Compare com FavoriteButton.native.tsx: a lógica (useFavoritesStore) é
// EXATAMENTE a mesma. Só a "casca" de UI muda — Pressable/Text vira
// button/span. É por isso que testamos a store separado do componente:
// 1 teste de lógica serve pros dois mundos.

import { useFavoritesStore } from './store/favoritesStore';

export function FavoriteButton({ movieId }: { movieId: number }) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(movieId));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <button onClick={() => toggle(movieId)}>
      {isFavorite ? '♥ Favoritado' : '♡ Favoritar'}
    </button>
  );
}
