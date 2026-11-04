// __tests__/integration/01-login-favoritar.test.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — integração: navegação real + estado real (RNTL)
//
// Renderiza o RootStack INTEIRO (navegação + react-query + stores) e atravessa
// o fluxo como o usuário: login → lista → favoritar. Sem token TMDB o app usa
// o mock determinístico — "Matrix" (id 603) sempre existe.
//
// Teste 1 vem resolvido (🧑‍🏫). Você completa o 2 e o 3.
// ─────────────────────────────────────────────────────────────────────────────

import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootStack from '@/routes/RootStack';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { testIDs } from '@/utils/testIDs';

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>,
  );
}

async function loginPelaUI() {
  fireEvent.changeText(screen.getByTestId(testIDs.login.emailInput), 'aluno@puc.br');
  fireEvent.changeText(screen.getByTestId(testIDs.login.passwordInput), '1234');
  fireEvent.press(screen.getByTestId(testIDs.login.submit));
  await waitFor(() => expect(screen.getByTestId(testIDs.movieList.screen)).toBeOnTheScreen());
}

describe('integração — login e favoritar', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: false, email: null });
    useFavoritesStore.setState({ ids: [] });
  });

  // 🧑‍🏫 1. resolvido — o fluxo de login atravessa a navegação
  it('1. login pela UI leva à lista de filmes com dados do mock', async () => {
    renderApp();

    // sem auth, o porteiro (RootStack) só mostra o Login
    expect(screen.getByTestId(testIDs.login.screen)).toBeOnTheScreen();

    await loginPelaUI();

    // dados do mock renderizados na lista
    await waitFor(() => expect(screen.getByText('Matrix')).toBeOnTheScreen());
  });
describe('Demonstração de Mock ', () => {
  it('2. tocar no coração do card favorita o filme no store', async () => {
    renderApp();
    await loginPelaUI();
    await waitFor(() => expect(screen.getByText('Matrix')).toBeOnTheScreen());

    // Mock do stopPropagation
    const stopPropagationMock = jest.fn();

    fireEvent.press(screen.getByTestId(testIDs.movieCard.heart(603)), {
        // Comentamos a passagem do mock ou passamos nada:
      stopPropagation: stopPropagationMock,
    });

    // Verificação no store
    expect(useFavoritesStore.getState().isFavorite(603)).toBe(true);

    });
  });


describe('Demonstração de Stub — Busca de Filmes', () => {

  it('3. retorna dados estáticos "enlatados" do Stub sem consultar a API real', async () => {

    // 1. O STUB: Definimos uma resposta estática e fixa para o endpoint/módulo de busca
    const tmdbApiStub = {
      searchMovies: jest.fn().mockResolvedValue([
        { id: 999, title: 'Filme Estático do Stub', vote_average: 8.5 }
      ])
    };

    // 2. Injetamos o Stub na chamada da função
    const resultado = await tmdbApiStub.searchMovies('qualquer termo');

    // 3. ASSERÇÃO DE STUB (Baseada em Dados/Estado):
    // Garantimos que o dado devolvido é exatamente a resposta enlatada do Stub
    expect(resultado).toEqual([
      { id: 999, title: 'Filme Estático do Stub', vote_average: 8.5 }
    ]);

    // Note que não nos importa COMO foi chamado, apenas O QUE ele devolveu (o dado fixo)
  });
});

  // 🧑‍💻 3. 🔴 DESAFIO — credencial inválida não navega
  it('4. login inválido mantém a tela de Login', async () => {

    // TODO: renderApp(), preencha email SEM @ e senha curta, press no submit
    // TODO: a tela de login continua na tela (queryByTestId(movielist.screen) === null)
    renderApp();

        fireEvent.changeText(screen.getByTestId(testIDs.login.emailInput), 'emailInvalido');
        fireEvent.changeText(screen.getByTestId(testIDs.login.passwordInput), '12');
        fireEvent.press(screen.getByTestId(testIDs.login.submit));

        expect(screen.getByTestId(testIDs.login.screen)).toBeOnTheScreen();
        expect(screen.queryByTestId(testIDs.movieList.screen)).toBeNull();
  });

});
