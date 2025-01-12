import React, { useState } from 'react'
import "react-day-picker/dist/style.css";
import './Login.css';

import { useAuth } from '../../Utils/AuthProvider';

interface LoginType {
  email: string,
  password: string
}

interface LoginError {
  status: number,
  message: string
}

function Login() {
  const auth = useAuth();
  const [inputs, setInputs] = useState<LoginType>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function isLoginError(result: boolean | LoginError): result is LoginError {
    return (result as LoginError).status !== undefined && (result as LoginError).message !== undefined;
  }   

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
        const result = await auth.login(inputs); 
        if (isLoginError(result)) {
            console.error("Login failed:", result.message);
            setError(result.message);

        } else if (result === true) {
            console.log("Login successful!");
        } else {
            setError("An unexpected error occurred.");
        }
    } catch (error) {
        console.error("Unexpected error during login:", error);
        setError("An error occurred during login. Please try again.");
    }
  };


  return (
    <div className='Login'>
      <div className="wrapper">
      <h2>Please login to access the Shangri-La petitions.</h2>
      <div className="error">
        {error}
      </div>
      <form onSubmit={loginUser}>
        <div className="label">
            Email:
        </div>
        <div className="input-box">
          <input
            type="text"
            name="email"
            placeholder="johndoe@gmail.com"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label">
            Password:
          </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="************"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box button">
          <input type="Submit" value="Login" />
        </div>
        <div className="text">
          <h3>
            Don't have an account? <a href="/register">Register</a>
          </h3>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login