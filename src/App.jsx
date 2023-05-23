import { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [allocations, setAllocations] = useState([]);

  function toggleNewFolio() {
    setIsOpen(!isOpen);
  }

  function addNewAllocation(event) {
    event.preventDefault();

    const newAllocation = {
      symbol: '',
      percentage: 0,
    };
    setAllocations([...allocations, newAllocation]);
  }

  function handleSymbolChange(index, event) {
    const updatedAllocations = [...allocations];
    updatedAllocations[index].symbol = event.target.value;
    setAllocations(updatedAllocations);
  }

  function handlePercentageChange(index, event) {
    const updatedAllocations = [...allocations];
    updatedAllocations[index].percentage = event.target.value;
    setAllocations(updatedAllocations);
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
                  Symbol:
                  <input type="text" />
                  Percentage: <input type="number" />
                </label>
                <div>
                  {allocations.map((allocation, index) => (
                    <div key={index}>
                      <label>
                        Symbol:
                        <input
                          type="text"
                          value={allocation.symbol}
                          onChange={(event) => handleSymbolChange(index, event)}
                        />
                      </label>
                      <label>
                        Percentage:
                        <input
                          type="number"
                          value={allocation.percentage}
                          onChange={(event) =>
                            handlePercentageChange(index, event)
                          }
                        />
                      </label>
                    </div>
                  ))}

                  <button onClick={addNewAllocation}>Add allocation</button>
                </div>
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

export default App;
