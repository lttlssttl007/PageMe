import { useState, useEffect } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import AdminScreen from './components/AdminScreen'

const API_URL = '/api';

function App() {
  const [screen, setScreen] = useState<'user' | 'admin'>('user');
  const [adminSetup, setAdminSetup] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  // Check if admin is set up
  const checkAdminSetup = async () => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin_check', password: 'admin_check', isAdmin: true })
      });
      setAdminSetup(res.status !== 400); // If 400, admin not set up
    } catch {
      setAdminSetup(false);
    }
  };

  // On mount, check admin setup
  useEffect(() => { checkAdminSetup(); }, []);

  const handleUserLogin = async (username: string, password: string) => {
    setMessage('');
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, isAdmin: false })
    });
    const data = await res.json();
    if (res.ok) setMessage('User login successful!');
    else setMessage(data.message || 'Login failed');
  };

  const handleAdminLogin = async (username: string, password: string) => {
    setMessage('');
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, isAdmin: true })
    });
    const data = await res.json();
    if (res.ok) setMessage('Admin login successful!');
    else setMessage(data.message || 'Login failed');
  };

  const handleAdminSetup = async (username: string, password: string) => {
    setMessage('');
    const res = await fetch(`${API_URL}/admin/setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Admin setup successful!');
      setAdminSetup(true);
    } else setMessage(data.message || 'Setup failed');
  };

  return (
    <div className="app-bg">
      {screen === 'user' ? (
        <LoginScreen
          onAdminClick={() => setScreen('admin')}
          onLogin={handleUserLogin}
        />
      ) : (
        <AdminScreen
          onBack={() => setScreen('user')}
          onSetup={handleAdminSetup}
          onLogin={handleAdminLogin}
          isSetup={!!adminSetup}
        />
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App
