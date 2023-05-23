import * as React from 'react';

export default function Header() {
  const flex__text = {
    display: 'flex',
    'justify-content': 'space-between',
  };
  return (
    <div>
      <header style={flex__text}>
        <h1>folio calc</h1>
        <button>Log in/Log out</button>
      </header>
    </div>
  );
}
