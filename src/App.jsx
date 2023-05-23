import { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNewFolio() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <Header />
      <main>
        <div>
          <button onClick={toggleNewFolio}>
            <b>+</b> new portfolio
          </button>
          {isOpen && (
            <form>
              <section>
                <label>
                  Starting date:
                  <input type="date" />
                </label>
              </section>
              <section>
                <label>
                  Initial investment:
                  <input type="number" />
                </label>
              </section>
              <section>
                <label>
                  Allocation:
                  <input type="text" />
                </label>
              </section>
              <section>
                <button>Submit</button>
              </section>
            </form>
          )}
        </div>
        <div>
          <h2>Current portfolios:</h2>
        </div>
        <div>
          <h2>Graph area</h2>
        </div>
        <Login />
      </main>
    </div>
  );
}
