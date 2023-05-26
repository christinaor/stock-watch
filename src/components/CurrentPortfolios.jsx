import React, { useState } from "react";

import { toast } from "react-toastify";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

import "../styles/currentPortfolios.css";

export default function CurrentPortfolios(props) {
  const { currentPortfolios } = props;

  // Create an object to store the collapsed state of each list
  const [collapsedLists, setCollapsedLists] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [allocations, setAllocations] = useState([]);
  const [listId, setListId] = useState(null);

  // Function to toggle the collapsed state of a list
  const toggleListCollapse = (listName) => {
    setCollapsedLists((prevCollapsedLists) => ({
      ...prevCollapsedLists,
      [listName]: !prevCollapsedLists[listName],
    }));
  };

  // Create an object to store the stocks grouped by list name
  const stocksByListName = currentPortfolios.reduce((acc, stock) => {
    const { list_name, stock_name, allocation } = stock;
    if (acc[list_name]) {
      acc[list_name].push({ stock_name, allocation });
    } else {
      acc[list_name] = [{ stock_name, allocation }];
    }
    return acc;
  }, {});

  // changed this function to push data to graphs
  const handlePortfolioClick = (e, listName) => {
    const selectedPortfolio = currentPortfolios.filter(
      (portfolio) => portfolio.list_name === listName
    );
    console.log(selectedPortfolio);

    // const selectedAllocations = selectedPortfolio.reduce(
    //   (accumulator, stock) => {
    //     accumulator.push({
    //       id: stock.id,
    //       allocation: stock.allocation,
    //       price: stock.price_of_stock,
    //       name: stock.stock_name,
    //       initialDate: stock.investment_date,
    //       initalInvestment: stock.initial_investment,
    //     });

    //     return accumulator;
    //   },
    //   []
    // );
    // console.log(selectedAllocations);
    setListId(selectedPortfolio[0].list_id);
    setGraphData(selectedPortfolio);
    // console.log(selectedPortfolio[0].list_id);
    // setPortfolio([...selectedPortfolio]);
    // setAllocations(selectedAllocations);
  };

  const handleUpdatedAllocation = (e, index) => {
    e.preventDefault();

    console.log(allocations);
    const updatedAllocations = [...allocations];
    updatedAllocations[index].allocation = parseFloat(e.target.value);
    console.log(updatedAllocations);
    setAllocations(updatedAllocations);
  };

  const handleUpdatePortfolio = () => {
    console.log("UPDATE CLICKED");
    console.log(listId, allocations);
    try {
      const updatePortfolioAllocations = async () => {
        const url = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${url}/stocks/bulk-update-delete-retrieve/${listId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(allocations),
          }
        );
        const data = await response.json();
        console.log(data);
      };

      updatePortfolioAllocations();
    } catch (err) {
      console.log(`Error updating allocations: ${err}`);
      toast.error("Could not update allocations - please try again!");
    }
  };

  const handleDeletePortfolio = () => {
    console.log("DELETE CLICKED");
    try {
      const deletePortfolio = async () => {
        const url = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${url}/stock/bulk-update-delete-retrieve/${listId}/`
        );
        const data = await response.json();
        console.log(data);
      };

      deletePortfolio();
    } catch (err) {
      console.log(`Error updating allocations: ${err}`);
      toast.error("Could not update allocations - please try again!");
    }
  };

  const handleCancelSelection = () => {
    console.log > "cancel portfolio";
  };

  // Set the initial collapsed state for all lists to true
  useState(() => {
    const initialCollapsedLists = Object.keys(stocksByListName).reduce(
      (acc, listName) => {
        acc[listName] = true;
        return acc;
      },
      {}
    );
    setCollapsedLists(initialCollapsedLists);
  }, []);

  return (
    <div>
      <h2>Current portfolios:</h2>
      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>Edit A Portfolio</button>
      )}
      {isEditing && (
        <div>
          <button onClick={() => setIsEditing(false)}>Cancel Edit</button>
          <div>Pick a portfolio</div>
        </div>
      )}
      <div className={`folio-list ${isEditing ? "editing" : ""}`}>
        {Object.entries(stocksByListName).map(([listName, stocks]) => (
          <div
            key={`list-${listName}`}
            className="list-item"
            onClick={(e) => handlePortfolioClick(e, listName)}
          >
            <div className="list-header">
              <h3>{listName}</h3>

              <button>Update Portfolio</button>

              <button onClick={() => toggleListCollapse(listName)}>
                {collapsedLists[listName] ? (
                  <strong>+</strong>
                ) : (
                  <strong>-</strong>
                )}
              </button>
            </div>

            {!collapsedLists[listName] && (
              <div>
                {(!isEditing || portfolio.length === 0) && (
                  <div>
                    {stocks.map((stock, index) => (
                      <div key={`stock-${index}`}>
                        <div>
                          <strong>{stock.stock_name}</strong>
                        </div>
                        <div>{(stock.allocation * 100).toFixed(2)}%</div>
                      </div>
                    ))}
                  </div>
                )}

                {isEditing && portfolio.length > 0 && (
                  <div>
                    {stocks.map((stock, index) => (
                      <div
                        key={
                          isEditing ? `edit-stock-${index}` : `stock-${index}`
                        }
                      >
                        {portfolio[0].list_name === listName && (
                          <div key={`edit-stock-${index}`}>
                            <div>
                              <strong>{stock.stock_name}</strong>
                            </div>

                            <label
                              htmlFor={`${listName}-allocation-${index}`}
                            />
                            <input
                              name={`${listName}-allocation-${index}`}
                              type="number"
                              value={allocations[index].allocation}
                              onChange={(e) =>
                                handleUpdatedAllocation(e, index)
                              }
                            />
                          </div>
                        )}

                        {portfolio[0].list_name !== listName && (
                          <div key={`stock-${index}`}>
                            <div>
                              <strong>{stock.stock_name}</strong>
                            </div>
                            <div>{(stock.allocation * 100).toFixed(2)}%</div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div>
                      <button onClick={handleUpdatePortfolio}>
                        Submit Update
                      </button>
                      <button onClick={handleDeletePortfolio}>Delete</button>
                      <button onClick={handleCancelSelection}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <section className="charts">
        {graphData && (
          <>
            <div className="line-chart">
              <LineChart graphData={graphData} />
            </div>

            <div className="pie-chart">
              <PieChart graphData={graphData} />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
