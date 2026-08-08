import { useState } from 'react';
import { adminSignIn } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await adminSignIn(email.trim(), password);
    } catch (e) {
      setError(
        e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'
          ? 'Incorrect email or password.'
          : e.message
      );
    }
    setBusy(false);
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={onSubmit}>
        <span className="login-flame">🔥</span>
        <h1 className="login-title">Holy Whisper</h1>
        <p className="login-sub">Admin Dashboard</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="username"
          autoFocus
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="login-error">⚠️ {error}</p>}

        <button className="login-btn" type="submit" disabled={busy || !email || !password}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
