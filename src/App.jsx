import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';

function App() {
  /**
   * New portfolio is ultimately what is submitted.
   * State needed for allocations, which is added to new portfolio upon submit.
   * All fields must be cleared once the new portfolio is submitted.
   */
  const userData = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    name: '',
    startDate: '',
    initialInvestment: '',
    allocations: [],
  });
  const [newAllocation, setNewAllocation] = useState({
    stockSymbol: '',
    percentage: 0,
  });
  const [isIncorrectPercent, setIsIncorrectPercent] = useState(false);

  function toggleNewFolio() {
    setIsOpen(!isOpen);
  }

  function addNewAllocation(event) {
    event.preventDefault();

    const {
      stockSymbol,
      percentage,
    } = newAllocation;

    if (stockSymbol && percentage) {
      setIsIncorrectPercent(false);
      setNewPortfolio({...newPortfolio, allocations: [...newPortfolio.allocations, {...newAllocation}]});
      setNewAllocation({
        stockSymbol: '',
        percentage: 0,
      });
    } else {
      console.log(stockSymbol, percentage, 'NOT complete')
    }    
  }
console.log(newPortfolio)
  function cancelNewAllocation(event) {
    event.preventDefault();

    setIsIncorrectPercent(false);
    setIsOpen(false);
    setNewPortfolio({
      name: '',
      startDate: '',
      initialInvestment: '',
      allocations: [],
    })
    setNewAllocation({
      stockSymbol: '',
      percentage: '',
    });
  }

  // function handleSymbolChange(index, event) {
  //   const updatedAllocations = [...allocations];
  //   updatedAllocations[index].symbol = event.target.value;
  //   setAllocations(updatedAllocations);
  // }

  // function handlePercentageChange(index, event) {
  //   const updatedAllocations = [...allocations];
  //   updatedAllocations[index].percentage = event.target.value;
  //   setAllocations(updatedAllocations);
  // }

  function handleSubmitAllocations(event) {
    event.preventDefault();

    const totalAllocation = newPortfolio.allocations.reduce((accumulator, allocation) => {
      return parseFloat(accumulator) + parseFloat(allocation.percentage)
    }, 0);

    if (totalAllocation !== 100) {
      setIsIncorrectPercent(true);
      return false;
    }

    // const postTickerData = async () => {
    //   const response = await fetch('/placeholder-route', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({...allocations})
    //   });
    //   const data = await response.json();
    //   console.log(data)
    // }

    // postTickerData();
  }

  return (
    <div>
      <UserContext.Provider>
        <Header />
        <main>
          {userData?.isLoggedIn && <div>{`Welcome ${userData?.username}!`}</div>}
          <div>
            <button onClick={toggleNewFolio}>
              <b>+</b> new portfolio
            </button>
            {isOpen && (
              <form>
                <section>
                  <h2>Portfolio Details</h2>
                  <label htmlFor="portfolio-name">Portfolio Name:</label>
                  <input 
                    name="portfolio-name"
                    type="text" 
                    value={newPortfolio.name}
                    onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})} 
                    required
                  />

                  <label htmlFor="start-date">Starting date:</label>
                  <input 
                    name="start-date"
                    type="date" 
                    value={newPortfolio.startDate}
                    onChange={(e) => setNewPortfolio({...newPortfolio, startDate: e.target.value})} 
                    required
                  />

                  <label htmlFor="initial-investment">Initial investment:</label>
                  <input 
                    name="initial-investment"
                    type="number" 
                    value={newPortfolio.initialInvestment}
                    onChange={(e) => setNewPortfolio({...newPortfolio, initialInvestment: e.target.value})} 
                    required
                  />
                </section>

                <section>
                  <h2>Allocations</h2>
                  <label htmlFor="symbol">Stock Symbol:</label>
                  <input 
                    name="symbol" 
                    type="text" 
                    value={newAllocation.stockSymbol}
                    onChange={(e) => setNewAllocation({...newAllocation, stockSymbol: e.target.value})} 
                    required
                  />

                  <label htmlFor="percentage">Percentage:</label>
                  <input 
                    name="percentage"
                    type="number" 
                    value={newAllocation.percentage}
                    placeholder={0}
                    onChange={(e) => setNewAllocation({...newAllocation, percentage: e.target.value})} 
                    required
                  />
                </section>

                <button onClick={addNewAllocation}>Add allocation</button>
                <button onClick={cancelNewAllocation}>Cancel</button>

                {newPortfolio.allocations.length > 0 && newPortfolio.allocations.map((allocation, index) => (
                  <div key={`allocation-${index}`}>
                    <div>{allocation.stockSymbol}</div>
                    <div>{allocation.percentage}</div>
                  </div>

                  // <div key={`allocation-${index}`}>
                  //   <label>
                  //     Symbol:
                  //     <input
                  //       type="text"
                  //       value={allocation[index]?.symbol}
                  //       onChange={(event) => handleSymbolChange(index, event)}
                  //     />
                  //   </label>
                  //   <label>
                  //     Percentage:
                  //     <input
                  //       type="number"
                  //       value={allocation[index]?.percentage}
                  //       onChange={(event) =>
                  //         handlePercentageChange(index, event)
                  //       }
                  //     />
                  //   </label>
                  // </div>
                ))}

                <button onClick={handleSubmitAllocations}>Submit</button>
                {isIncorrectPercent && <div>Allocations do not add up to 100% - please check again!</div>}
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
      </UserContext.Provider>
    </div>
  );
}

export default App;
