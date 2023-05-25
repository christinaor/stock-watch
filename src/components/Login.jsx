import React, { useState } from "react";
import "../styles/login.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
 
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    const url = import.meta.env.VITE_API_URL
    e.preventDefault();
    try {
      const response = await fetch(`${url}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data));
        console.log('Login successful');
        toast.success('Login successful');
      } else {
        console.log('Login failed');
        toast.error('Login failed');
      }
    } catch (error) {
      // Handle the login error
      // Display an error message
      console.error('Login error:', error.message);
      toast.error('Login error:', error.message);
    }
  };
  
  

  const styles = {
    container: { border: "solid black 3px" },
    disabled: { backgroundColor: "#A8A8A8" },
    btn: { border: "solid black 3px" },
  };

  return (
    <div className="login-modal">
      <div className="login__text" style={styles.container}>
        <button
          onClick={() => {
            setIsLoggingIn(true);
            setIsRegistering(false);
           
          }}
          style={isLoggingIn ? styles.disabled : styles.btn}
        >
          Login
        </button>
        <button
          onClick={() => {
            setIsLoggingIn(false);
            setIsRegistering(true);
          }}
          style={isRegistering ? styles.disabled : styles.btn}
        >
          Register
        </button>
        {isLoggingIn && (
          <div>
            <div>
              <label>
                Username: 
              <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              />
              </label>
            </div>
            <div>
              <label>
                Password: 
                <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              required
                ="text" />
              </label>
            </div>
            <div>
              <button onClick={ handleLogin}>Submit</button>
            </div>
          </div>
        )}
        {isRegistering && (
          <div>
            <div>
              <label>
                New User: <input type="text" />
              </label>
            </div>
            <div>
              <label>
                New Password: <input type="text" />
              </label>
            </div>
            <div>
              <button>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
