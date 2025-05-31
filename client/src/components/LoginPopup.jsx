// src/components/LoginPopup.jsx
import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

function LoginPopup({ close, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const submit = async e => {
    e.preventDefault();
    try {
      const apiCall = isRegister ? registerUser : loginUser;
      const { data } = await apiCall({ username, password });
      if (!isRegister) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      close();
    } catch (err) {
      setError('Auth failed');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={submit}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">{isRegister ? 'Create' : 'Login'}</button>
          <button type="button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Have an account? Login' : 'Need an account? Register'}
          </button>
          <button type="button" onClick={close}>Close</button>
        </form>
      </div>
    </div>
  );
}
export default LoginPopup;
