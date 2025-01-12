import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import './Login.css';

import { validateUser } from '../../Utils/Requests';
import { useAuth } from '../../Utils/AuthProvider';

interface LoginType {
  email: string,
  password: string
}

function Login() {
  const auth = useAuth();
  const [inputs, setInputs] = useState<LoginType>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<String>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }
  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result: any = await auth.login(inputs);
    if (result instanceof Error) {
      console.error("Login failed:", result.message);
      setError(result.message);
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