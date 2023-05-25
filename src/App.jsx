import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";
// import Login from "./components/Login";
import "./App.css";

function App() {
  /**
   * New portfolio is ultimately what is submitted.
   * State needed for allocations, which is added to new portfolio upon submit.
   * All fields must be cleared once the new portfolio is submitted.
   */
  const userData = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    name: "",
    startDate: "",
    initialInvestment: "",
    allocations: [],
  });
  const [newAllocation, setNewAllocation] = useState({
    stockSymbol: "",
    percentage: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedAllocations, setEditedAllocations] = useState([]);
  const [isIncorrectPercent, setIsIncorrectPercent] = useState(false);

  function toggleNewFolio() {
    setIsOpen(!isOpen);
  }

  function addNewAllocation(event) {
    event.preventDefault();

    const { stockSymbol, percentage } = newAllocation;

    if (stockSymbol && percentage) {
      setIsIncorrectPercent(false);
      setNewPortfolio({
        ...newPortfolio,
        allocations: [...newPortfolio.allocations, { ...newAllocation }],
      });
      setNewAllocation({
        stockSymbol: "",
        percentage: 0,
      });
    } else {
      console.log(stockSymbol, percentage, "NOT complete");
    }
  }

  function cancelNewAllocation(event) {
    event.preventDefault();

    setIsIncorrectPercent(false);
    setIsOpen(false);
    setNewPortfolio({
      name: "",
      startDate: "",
      initialInvestment: "",
      allocations: [],
    });
    setNewAllocation({
      stockSymbol: "",
      percentage: "",
    });
  }

  function handleAllocationUpdate(event, index) {
    event.preventDefault();

    const updatedAllocations = [...newPortfolio.allocations];
    updatedAllocations[index].percentage = event.target.value;
    setEditedAllocations(updatedAllocations);
  }

  function handleNewPortfolioUpdate(event) {
    event.preventDefault();

    setNewPortfolio({...newPortfolio, allocations: [...editedAllocations]});
    setEditedAllocations([]);
    setIsEditing(false);
  }

  function handleCancelNewPortfolioUpdate(event) {
    event.preventDefault();

    setEditedAllocations([]);
    setIsEditing(false);
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

  function handleDeleteAllocation(event, index) {
    event.preventDefault();

    const updatedAllocations = newPortfolio.allocations.filter((allocation, i) => i !== index);
    setNewPortfolio({...newPortfolio, allocations: [...updatedAllocations]});
  }

  function handleSubmitAllocations(event) {
    event.preventDefault();

    const totalAllocation = newPortfolio.allocations.reduce(
      (accumulator, allocation) => {
        return parseFloat(accumulator) + parseFloat(allocation.percentage);
      },
      0
    );

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
          {userData?.isLoggedIn && (
            <div>{`Welcome ${userData?.username}!`}</div>
          )}

          <div>
            <div className="add__btn">
              <button className="allocation__btn" onClick={toggleNewFolio}>
                <b>+</b> new portfolio
              </button>
            </div>
            
            {isOpen && (
              <form>
                <section className="new-folio-container">
                  <h2>Portfolio Details</h2>
                  <label htmlFor="portfolio-name">Portfolio Name:</label>
                  <input
                    name="portfolio-name"
                    className="detail__input"
                    type="text"
                    value={newPortfolio.name}
                    onChange={(e) =>
                      setNewPortfolio({ ...newPortfolio, name: e.target.value })
                    }
                    required
                  />

                  <label htmlFor="start-date">Starting date:</label>
                  <input
                    name="start-date"
                    className="detail__input"
                    type="date"
                    value={newPortfolio.startDate}
                    onChange={(e) =>
                      setNewPortfolio({
                        ...newPortfolio,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />

                  <label htmlFor="initial-investment">
                    Initial investment:
                  </label>
                  <input
                    name="initial-investment"
                    className="detail__input"
                    type="number"
                    value={newPortfolio.initialInvestment}
                    onChange={(e) =>
                      setNewPortfolio({
                        ...newPortfolio,
                        initialInvestment: e.target.value,
                      })
                    }
                    required
                  />
                </section>

                <section className="allocations-container">
                  <h2>Allocations</h2>
                  <label htmlFor="symbol">Stock Symbol:</label>
                  <input
                    name="symbol"
                    type="text"
                    value={newAllocation.stockSymbol}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        stockSymbol: e.target.value,
                      })
                    }
                    required
                  />

                  <label htmlFor="percentage">Percentage:</label>
                  <input
                    name="percentage"
                    type="number"
                    value={newAllocation.percentage}
                    placeholder={0}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        percentage: e.target.value,
                      })
                    }
                    required
                  />

                  <button
                    className="allocation__btn"
                    onClick={addNewAllocation}
                  >
                    Add allocation
                  </button>
                  


                  <div>
                    <button
                      className="allocation__btn"
                      onClick={cancelNewAllocation}
                    >
                      Cancel
                    </button>

                    {newPortfolio.allocations.length > 0 && !isEditing && newPortfolio.allocations.map((allocation, index) => (
                      <section key={`allocation-${index}`}>
                        <h3>{allocation.stockSymbol}</h3>
                        <div>{allocation.percentage}</div>
                      </section>
                    ))}
                  
                    {!isEditing && <button onClick={() => setIsEditing(true)}>Edit Allocations</button>}
                  
                    {isEditing && newPortfolio?.allocations.length > 0 && <section>
                      {newPortfolio.allocations.map((allocation, index) => (
                        <div key={`edit-allocation-${index}`}>
                          <h3>{allocation.stockSymbol}</h3>

                          <label htmlFor="percentage">Percentage:</label>
                          <input
                            name="percentage"
                            type="number"
                            value={allocation.percentage}
                            placeholder={0}
                            onChange={(e) => handleAllocationUpdate(e, index)}
                            required
                          />

                          <button onClick={(e) => handleDeleteAllocation(e, index)}>Delete allocation</button>
                        </div>
                      ))}

                      <button onClick={handleNewPortfolioUpdate}>Update Allocations</button>
                      <button onClick={handleCancelNewPortfolioUpdate}>Cancel Editing</button>
                    </section>}

                    <button
                      className="allocation__btn"
                      onClick={handleSubmitAllocations}
                    >
                      Submit
                    </button>
                  </div>
                </section>

                {isIncorrectPercent && (
                  <div>
                    Allocations do not add up to 100% - please check again!
                  </div>
                )}
              </form>
            )}
          </div>

          <div className="folio-list">
            <h2>Current portfolios:</h2>
          </div>

          <div>
            <h2>Graph area</h2>
          </div>

          {/* <Login /> */}
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
