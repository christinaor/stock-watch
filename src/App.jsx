import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Header from './components/Header';
import Login from './components/Login';
import './App.css';

function App() {
  const userData = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [newAllocation, setNewAllocation] = useState({
    startDate: '',
    initialInvestment: '',
    symbol: '',
    percentage: null,
  });
  const [allocations, setAllocations] = useState([]);
  const [isIncorrectPercent, setIsIncorrectPercent] = useState(false);

  function toggleNewFolio() {
    setIsOpen(!isOpen);
  }

  function addNewAllocation(event) {
    event.preventDefault();

    const {
      startDate,
      initialInvestment,
      symbol,
      percentage,
    } = allocations;

    if (startDate && initialInvestment && symbol && percentage) {
      setIsIncorrectPercent(false);
      setAllocations([...allocations, {...newAllocation}]);
      setNewAllocation({
        startDate: '',
        initialInvestment: '',
        symbol: '',
        percentage: null,
      });
    } else {
      console.log('NOT complete')
    }    
  }

  function cancelNewAllocation(event) {
    event.preventDefault();

    setIsIncorrectPercent(false);
    setIsOpen(false);
    setNewAllocation({
      startDate: '',
      initialInvestment: '',
      symbol: '',
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

    const totalAllocation = allocations.reduce((accumulator, allocation) => {
      return parseFloat(accumulator) + parseFloat(allocation.percentage)
    }, 0);

    if (totalAllocation !== 100) {
      setIsIncorrectPercent(true);
      return false;
    }

    // const fetchTickerData = async () => {
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

    // fetchTickerData();
  }
  
  console.log(allocations)
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
                  <label htmlFor="start-date">Starting date:</label>
                  <input 
                    name="start-date"
                    type="date" 
                    value={newAllocation.startDate}
                    onChange={(e) => setNewAllocation({...newAllocation, startDate: e.target.value})} 
                    required
                  />
                </section>

                <section>
                  <label htmlFor="initial-investment">Initial investment:</label>
                  <input 
                    name="initial-investment"
                    type="number" 
                    value={newAllocation.initialInvestment}
                    onChange={(e) => setNewAllocation({...newAllocation, initialInvestment: e.target.value})} 
                    required
                  />
                </section>

                <section>
                  <label htmlFor="symbol">Symbol:</label>
                  <input 
                    name="symbol" 
                    type="text" 
                    value={newAllocation.symbol}
                    onChange={(e) => setNewAllocation({...newAllocation, symbol: e.target.value})} 
                    required
                  />
                </section>

                <section>
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

                {allocations.length > 0 && allocations.map((allocation, index) => (
                  <div key={`allocation-${index}`}>
                    <div>{allocation.symbol}</div>
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
