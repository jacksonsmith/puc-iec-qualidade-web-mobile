# User story — Favoritar um filme

**Como** usuário logado do CineFav
**Quero** favoritar um filme na lista e conferir na tela de favoritos
**Para** guardar os filmes que pretendo assistir

## Critérios de aceite

1. Na lista de filmes, cada card tem um botão de coração (`movie-card-heart-<id>`).
2. Ao clicar no coração do filme "Matrix" (id 603), o botão muda pro estado favoritado.
3. Ao abrir a tela de Favoritos (`movielist-favorites-button`), o filme "Matrix" aparece na lista (`favorites-item-603`).
4. O contador (`favorites-count`) mostra "1 filme favorito".

## Contexto técnico (pro gerador)

- App em http://localhost:4173 · login: aluno@puc.br / 1234 (tela `/login`)
- Seletores via `data-testid` — convenção `<tela>-<elemento>` (ver testIDs do app)
- login: `login-email-input`, `login-password-input`, `login-submit-button`
- lista: `movielist-screen`, `movielist-grid`, `movielist-favorites-button`
- favoritos: `favorites-screen`, `favorites-count`, `favorites-item-<id>`
