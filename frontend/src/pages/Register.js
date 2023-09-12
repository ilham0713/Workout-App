import React from 'react';

const Register = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    console.log('Registration submitted:');
    console.log('Username:', username);
    console.log('Password:', password);

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('API failed');
    }

    console.log('Registration successful');
    // Redirect to the home page
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username"/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password"/>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword"/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;