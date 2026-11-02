// FavoriteButton.native.tsx — versão MOBILE (React Native), escrita PRIMEIRO.
//
// Repare: toda a lógica de favoritar mora na store (favoritesStore.ts).
// Este componente só LÊ e CHAMA a store — não guarda estado próprio.

import { Pressable, Text } from 'react-native';
import { useFavoritesStore } from './store/favoritesStore';

export function FavoriteButton({ movieId }: { movieId: number }) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(movieId));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Pressable onPress={() => toggle(movieId)} accessibilityRole="button">
      <Text>{isFavorite ? '♥ Favoritado' : '♡ Favoritar'}</Text>
    </Pressable>
  );
}
