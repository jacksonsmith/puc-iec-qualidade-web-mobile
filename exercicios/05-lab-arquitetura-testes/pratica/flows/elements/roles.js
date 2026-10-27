// 🔵 DEMO — "getByRole" do Maestro: seletores por papel, num lugar só.
// `output` é global do Maestro (não é Node). id/text no Maestro são REGEX.
output.role = {
  // Pega qualquer ID de botão de coração: movie-card-heart-<id>
  botaoCoracao: "movie-card-heart-.*",
  // Botão de navegação para tela de favoritos
  botaoFavoritos: "movielist-favorites-button",
  // Pega qualquer item na lista de favoritos: favorites-item-<id>
  itemFavorito: "favorites-item-.*",
};