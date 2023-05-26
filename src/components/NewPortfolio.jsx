import { useState } from 'react';

import AddNewPortfolioToggle from './AddNewPortfolioToggle';

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import NewPortfolioDetails from './NewPortfolioDetails';
import NewPortfolioAllocations from './NewPortfolioAllocations';

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
  const [isIncorrectPercent, setIsIncorrectPercent] = useState(false);

  const toggleNewFolio = () => {
    setIsOpen(!isOpen);
  }

  const cancelNewPortfolio = (event) => {
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
          <NewPortfolioDetails
            newPortfolio={newPortfolio}
            setNewPortfolio={setNewPortfolio}
          />

          <NewPortfolioAllocations
            newPortfolio={newPortfolio}
            setNewPortfolio={setNewPortfolio}
            newAllocation={newAllocation}
            setNewAllocation={setNewAllocation}
            setIsIncorrectPercent={setIsIncorrectPercent}
          />

          <div>
            <button
              className="allocation__btn"
              onClick={cancelNewPortfolio}
            >
              Cancel New Portfolio
            </button>
            <button
              className="allocation__btn"
              onClick={handleSubmitNewPortfolio}
            >
              Submit
            </button>
          </div>

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