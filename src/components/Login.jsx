import { useState } from "react";
import "../styles/login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Login( { setLoggedIn }) {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [inputs2, setInputs2] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;
  const { newUsername, newPassword } = inputs2;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange2 = (e) => {
    setInputs2((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    const url = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${url}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoggedIn(true);
        console.log("Login successful");
        toast.success("Login successful");
      } else {
        console.log("Login failed");
        toast.error("Login failed");
      }
    } catch (error) {
      // Handle the login error
      // Display an error message
      console.error("Login error:", error.message);
      toast.error("Login error:", error.message);
    }
  };

  const handleRegistration = async (e) => {
    const url = import.meta.env.VITE_API_URL;
    e.preventDefault();
    try {
      const response = await fetch(`${url}/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Registration successful");
      } else {
        console.log("Registration failed");
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      toast.error("Registration error:", error.message);
    }
  };

  const styles = {
    container: { border: "solid black 3px" },
    disabled: { border: "solid #AAFF00 2px", padding: "0.5em" },
    btn: { border: "solid black 2px", padding: "0.5em" },
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
                  required="text"
                />
              </label>
            </div>
            <div>
              <button className="login__submit" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </div>
        )}
        {isRegistering && (
          <div>
            <div>
              <label>
                New User:
                <input
                  type="username"
                  id="newUsername"
                  name="newUsername"
                  value={newUsername}
                  onChange={handleChange2}
                  placeholder="Enter your username"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                New Password:
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange2}
                  placeholder="Enter password"
                  required="text"
                />
              </label>
            </div>
            <div>
              <button className="login__submit" onClick={handleRegistration}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
