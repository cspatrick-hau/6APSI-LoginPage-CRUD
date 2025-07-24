import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const validUsername = 'admin';
  const validPassword = '1234';

  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      navigate('/landing');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #e0c3fc, #8ec5fc);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .login-container {
          background: #fff;
          padding: 40px 50px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
          width: 350px;
        }

        .login-title {
          font-size: 24px;
          font-weight: bold;
          color: #4a4a4a;
          margin-bottom: 10px;
        }

        .login-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 25px;
        }

        .input-field {
          width: 100%;
          padding: 12px 15px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
          transition: 0.3s;
        }

        .input-field:focus {
          border-color: #8ec5fc;
          outline: none;
          box-shadow: 0 0 5px rgba(142, 197, 252, 0.5);
        }

        .btn {
          width: 100%;
          padding: 12px;
          margin-top: 15px;
          background-color: #6a67ce;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }

        .btn:hover {
          background-color: #4c48a5;
        }
      `}</style>

      <div className="login-container">
        <h2 className="login-title">Event Registration Portal</h2>
        <p className="login-subtitle">
          A simple web system for managing participants of an event, seminar, or competition.
        </p>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}

export default LoginPage;
