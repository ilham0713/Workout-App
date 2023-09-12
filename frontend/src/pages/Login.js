import React from 'react';

const Login = () => {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
  
    console.log('Login submitted:');
    console.log('Username:', username);
    console.log('Password:', password);
  
    const response = await fetch(`/api/users?username=${username}&password=${password}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      throw new Error('API Failed');
    }
  
    localStorage.setItem('username', username);
    console.log('Login successful');
    // Redirect to the home page
    window.location.href = '/';
  }
    

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username"/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password"/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;