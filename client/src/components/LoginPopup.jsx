import { useState } from 'react';
import { loginUser } from '../services/api';

function LoginPopup({ close, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      close();
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
          <button type="button" onClick={close}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
