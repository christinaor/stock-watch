import { useState } from 'react';

import AddNewPortfolioToggle from './AddNewPortfolioToggle';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function NewPortfolio(props) {
  const {
    userId,
  }= props;

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
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAllocations, setEditedAllocations] = useState([]);
  const [isIncorrectPercent, setIsIncorrectPercent] = useState(false);

  const toggleNewFolio = () => {
    setIsOpen(!isOpen);
  }

  const addNewAllocation = (event) => {
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

  const cancelNewAllocation = (event) => {
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

  const handleAllocationUpdate = (event, index) => {
    event.preventDefault();

    const updatedAllocations = [...newPortfolio.allocations];
    updatedAllocations[index].percentage = event.target.value;
    setEditedAllocations(updatedAllocations);
  }

  const handleNewPortfolioUpdate = (event) => {
    event.preventDefault();

    setNewPortfolio({ ...newPortfolio, allocations: [...editedAllocations] });
    setEditedAllocations([]);
    setIsEditing(false);
  }

  const handleCancelNewPortfolioUpdate = (event) => {
    event.preventDefault();

    setEditedAllocations([]);
    setIsEditing(false);
  }

  const handleDeleteAllocation = (event, index) => {
    event.preventDefault();

    const updatedAllocations = newPortfolio.allocations.filter(
      (allocation, i) => i !== index
    );
    setNewPortfolio({ ...newPortfolio, allocations: [...updatedAllocations] });
  }


  const handleSubmitNewPortfolio = (event) => {
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

    try {
      const postTickerData = async () => {
        const stocks = newPortfolio.allocations.reduce((accumulator, stock) => {
          const refactoredStock = {
            stock_name: stock.stockSymbol.toUpperCase(),
            allocation: parseFloat(stock.percentage / 100.0),
          };
          accumulator.push(refactoredStock);

          return accumulator;
        }, []);

        console.log(newPortfolio.userId);
        const responseBody = {
          investment_date: newPortfolio.startDate,
          initial_balance: parseFloat(newPortfolio.initialInvestment),
          stocks: stocks,
          user_stock: userId,
          list_name: newPortfolio.name,
        };

        console.log(stocks);
        console.log(responseBody);

        const url = `${import.meta.env.VITE_API_URL}/stocks/create/`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseBody),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Stock creation successful", data);
          toast.success("Portfolio creation successful");
        } else {
          console.log("Portfolio creation failed");
          toast.error("Portfolio creation failed");
        }
      };

      postTickerData();
    } catch (err) {
      console.error(`Creating portfolio error encountered: ${err}`);
      toast.error(`Creating portfolio error encountered`);
    }
  }

  return (
    <div className="addNewPortfolio_container">
      <AddNewPortfolioToggle
        className="add__btn allocation__btn"
        handleClick={toggleNewFolio}
        text="new portfolio"
      />

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

              {newPortfolio.allocations.length > 0 &&
                !isEditing &&
                newPortfolio.allocations.map((allocation, index) => (
                  <section key={`allocation-${index}`}>
                    <h3>{allocation.stockSymbol}</h3>
                    <div>{allocation.percentage}</div>
                  </section>
                ))}

              {!isEditing && (
                <button onClick={() => setIsEditing(true)}>
                  Edit Allocations
                </button>
              )}

              {isEditing && newPortfolio?.allocations.length > 0 && (
                <section>
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

                      <button
                        onClick={(e) => handleDeleteAllocation(e, index)}
                      >
                        Delete allocation
                      </button>
                    </div>
                  ))}

                  <button onClick={handleNewPortfolioUpdate}>
                    Update Allocations
                  </button>
                  <button onClick={handleCancelNewPortfolioUpdate}>
                    Cancel Editing
                  </button>
                </section>
              )}

              <button
                className="allocation__btn"
                onClick={handleSubmitNewPortfolio}
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
  );
};