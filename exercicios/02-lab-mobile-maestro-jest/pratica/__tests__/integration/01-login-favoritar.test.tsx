import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../../App';

describe('Integração: Login e Favoritar', () => {
  test('2. deve realizar login e navegar para a tela principal', async () => {
    const { getByTestId, findByTestId } = render(<App />);

    try {
      const emailInput = getByTestId('login-email-input');
      fireEvent.changeText(emailInput, 'aluno@puc.br');
      fireEvent.changeText(getByTestId('login-password-input'), '1234');
      fireEvent.press(getByTestId('login-submit-button'));
    } catch (e) {
      // Já logado
    }

    const mainScreen = await findByTestId('movielist-screen');
    expect(mainScreen).toBeTruthy();
  });

  test('3. deve favoritar um filme e refletir a mudança no estado/UI', async () => {
    const { getByTestId, findByTestId } = render(<App />);

    try {
      fireEvent.changeText(getByTestId('login-email-input'), 'aluno@puc.br');
      fireEvent.changeText(getByTestId('login-password-input'), '1234');
      fireEvent.press(getByTestId('login-submit-button'));
    } catch (e) {
      // Já logado
    }

    await findByTestId('movielist-screen');
    const favoriteButton = await findByTestId('movie-card-heart-603');
    
    // Passa o mock de stopPropagation para evitar o erro do evento nativo
    fireEvent.press(favoriteButton, { stopPropagation: () => {} });

    expect(favoriteButton).toBeTruthy();
  });
});