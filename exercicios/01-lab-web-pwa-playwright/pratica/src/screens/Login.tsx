import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/store/auth';
import { testIDs } from '@/utils/testIDs';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user = login(email, password);
    if (!user) {
      setError('E-mail ou senha inválidos');
      return;
    }
    navigate('/', { replace: true });
  }

  return (
    <main className="login-screen" data-testid={testIDs.login.screen}>
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>
          <span className="logo-mark">★</span> CineFav
        </h1>
        <label>
          E-mail
          <input
            type="email"
            data-testid={testIDs.login.emailInput}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            data-testid={testIDs.login.passwordInput}
            placeholder="••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && (
          <p className="login-error" data-testid={testIDs.login.error} role="alert">
            {error}
          </p>
        )}
        <button type="submit" data-testid={testIDs.login.submit}>
          Entrar
        </button>
        <p className="login-hint">dica: aluno@puc.br / 1234</p>
      </form>
    </main>
  );
}
