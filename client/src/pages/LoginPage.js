import React, { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom'; // Import Link
import { UserContext } from '../UserContext';
import './register.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`${window.location.origin}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <form className='register' onSubmit={login}>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='Enter your username or email'
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type='password'
          placeholder='Enter Your Password'
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>
      <p>
        Not registered yet?{' '}
        <Link to="/register">Register here</Link> {/* Link to the register page */}
      </p>
    </>
  );
};

export default LoginPage;
