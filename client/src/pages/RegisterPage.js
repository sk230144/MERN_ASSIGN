import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import './register.css'

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch(`${window.location.origin}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password, name, dob }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      alert('Registration successful');
      setRegistrationSuccess(true);
    } else {
      alert('Registration failed');
    }
  }

  if (registrationSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="name"
          placeholder="Full Name"
          value={name}
          onChange={ev => setName(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <input
          type="dob"
          placeholder="Date of Birth"
          value={dob}
          onChange={ev => setDob(ev.target.value)}
        />
        <button>Register</button>
      </form>
      <p>
        Already registered?{' '}
        <Link to="/login">Login here</Link>
      </p>
    </>
  );
};

export default RegisterPage;
