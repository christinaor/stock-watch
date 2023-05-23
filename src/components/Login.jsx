import React from 'react';

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = React.useState(true);
  const [isRegistering, setIsRegistering] = React.useState(false);

  const container = {
    border: 'solid black 3px',
  };
  return (
    <div>
      <div style={container}>
        <button>Login</button>
        <button>Register</button>
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
          </div>
        )}
      </div>
    </div>
  );
}
