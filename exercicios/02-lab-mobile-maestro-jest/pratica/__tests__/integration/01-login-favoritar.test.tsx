import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../App';
import { useAuthStore } from '../../src/store/authStore';
import { useFavoritesStore } from '../../src/store/favoritesStore';

describe('Integração: Login e Favoritos', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    useFavoritesStore.setState({ favorites: [] });
  });

  it('teste 1: renderiza tela de login corretamente', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('login-screen')).toBeTruthy();
    });
  });

  it('teste 2: realiza login e navega para a home', async () => {
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId('login-screen')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('login-email-input'), 'aluno@puc.br');
    fireEvent.changeText(getByTestId('login-password-input'), '1234');
    fireEvent.press(getByTestId('login-submit-button'));

    await waitFor(() => {
      expect(getByTestId('movielist-screen')).toBeTruthy();
    });
  });

  it('teste 3: favorita um filme após o login', async () => {
    useAuthStore.getState().logout();
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId('login-screen')).toBeTruthy();
    });

    fireEvent.changeText(getByTestId('login-email-input'), 'aluno@puc.br');
    fireEvent.changeText(getByTestId('login-password-input'), '1234');
    fireEvent.press(getByTestId('login-submit-button'));

    await waitFor(() => {
      expect(getByTestId('movielist-screen')).toBeTruthy();
    });

    fireEvent.press(getByTestId('movie-card-603'));

    await waitFor(() => {
      expect(getByTestId('detail-favorite-button')).toBeTruthy();
    });

    fireEvent.press(getByTestId('detail-favorite-button'));
  });
});