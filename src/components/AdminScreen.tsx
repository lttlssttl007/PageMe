import React, { useState } from 'react';

interface AdminProps {
  onBack: () => void;
  onSetup: (username: string, password: string) => void;
  onLogin: (username: string, password: string) => void;
  isSetup: boolean;
}

const AdminScreen: React.FC<AdminProps> = ({ onBack, onSetup, onLogin, isSetup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSetup) {
      onLogin(username, password);
    } else {
      onSetup(username, password);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSetup ? 'Admin Login' : 'Admin Setup'}</h2>
        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSetup ? 'Login' : 'Set Up'}</button>
      </form>
      <button className="admin-btn" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default AdminScreen;
