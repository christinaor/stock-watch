import React, { useState } from 'react';

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  const styles = {
    container: { border: 'solid black 3px' },
    disabled: { backgroundColor: '#A8A8A8' },
    btn: { border: 'solid black 3px' },
  };

  return (
    <div>
      <div style={styles.container}>
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
                Username: <input type="text" />
              </label>
            </div>
            <div>
              <label>
                Password: <input type="text" />
              </label>
            </div>
            <div>
              <button>Submit</button>
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
