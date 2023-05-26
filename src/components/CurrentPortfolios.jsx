import React, { useState } from 'react';

import { toast } from "react-toastify";

import '../styles/currentPortfolios.css'

export default function CurrentPortfolios(props) {
  const { currentPortfolios, setCurrentPortfolios } = props;

  // Create an object to store the collapsed state of each list
  const [collapsedLists, setCollapsedLists] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
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

  const handlePortfolioUpdateClick = (e, listName) => {
    const selectedPortfolio = currentPortfolios.filter((portfolio => portfolio.list_name === listName))

    const selectedAllocations = selectedPortfolio.reduce((accumulator, stock) => {
      accumulator.push({
        id: stock.id,
        allocation: stock.allocation,
      });

      return accumulator;
    }, []);
    setListId(selectedPortfolio[0].list_id);
    setPortfolio([...selectedPortfolio]);
    setAllocations(selectedAllocations);
  }

  const handlePortfolioDeleteClick = (e, listName) => {
    const selectedPortfolio = currentPortfolios.filter((portfolio => portfolio.list_name === listName))

    const selectedAllocations = selectedPortfolio.reduce((accumulator, stock) => {
      accumulator.push({
        id: stock.id,
        allocation: stock.allocation,
      });

      return accumulator;
    }, []);
    setListId(selectedPortfolio[0].list_id);
    setPortfolio([...selectedPortfolio]);
    setAllocations(selectedAllocations);
    setIsDeleting(true);
  }

  const handleCancelDeletePortfolio = () => {
    setListId(null);
    setPortfolio([]);
    setAllocations([]);
    setIsDeleting(false);
  }

  const handleUpdatedAllocation = (e, index) => {
    e.preventDefault();

    const updatedAllocations = [...allocations];
    updatedAllocations[index].allocation = parseFloat(e.target.value);
    setAllocations(updatedAllocations);
  }

  const handleUpdatePortfolio = () => {
    try {
      const updatePortfolioAllocations = async () => {
        const url = import.meta.env.VITE_API_URL;
        const response = await fetch(`${url}/stocks/bulk-update-delete-retrieve/${listId}/`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([...allocations]),
        });
        // const data = await response.json();
        
        if (response.ok) {
          const updatedCurrentPortfolios = currentPortfolios.reduce((accumulator, stock) => {
            for (const allocation of allocations) {
              if (allocation.id === stock.id) {
                stock.allocation = allocation.allocation;
              }
            }
            accumulator.push(stock)

            return accumulator;
          }, []);
          
          setCurrentPortfolios([...updatedCurrentPortfolios]);
          setListId(null);
          setPortfolio([]);
          setAllocations([]);
          setIsEditing(false);

          toast.success("Updated portfolio.");
        }
        
        
      };

      updatePortfolioAllocations();
    } catch(err) {
      toast.error("Could not update allocations - please try again!");
    }
  }

  const handleDeletePortfolio = () => {
    try {
      const deletePortfolio = async () => {
        const url = import.meta.env.VITE_API_URL;
        const response = await fetch(`${url}/stocks/bulk-update-delete-retrieve/${listId}/`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([...allocations]),
        });
        // const data = await response.json();

        if (response.ok) {
          const updatedCurrentPortfolios = currentPortfolios.filter(portfolio => portfolio.list_id === listId)
          
          setCurrentPortfolios([...updatedCurrentPortfolios]);
          setListId(null);
          setPortfolio([]);
          setAllocations([]);
          setIsDeleting(false);
          setIsEditing(false);
        
          toast.success("Deleted portfolio.");
        }
      };

      deletePortfolio();
    } catch(err) {
      toast.error("Could not update allocations - please try again!");
    }
  }

  const handleCancelSelection = () => {
    setListId(null);
    setPortfolio([]);
    setAllocations([]);
  }

  // Set the initial collapsed state for all lists to true
  useState(() => {
    const initialCollapsedLists = Object.keys(stocksByListName).reduce((acc, listName) => {
      acc[listName] = true;
      return acc;
    }, {});
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
          <div>Pick a portfolio...</div>
        </div>
      )}
      <div className={`folio-list ${isEditing ? 'editing' : ''}`}>
        {Object.entries(stocksByListName).map(([listName, stocks]) => (
          <div key={`list-${listName}`} className="list-item">
            <div className="list-header">
              <h3>{listName}</h3>

              <button onClick={() => toggleListCollapse(listName)}>
                {collapsedLists[listName] ? <strong>+</strong> : <strong>-</strong>}
              </button>
            </div>

            {!collapsedLists[listName] && (
              <div>
                {(!isEditing || isDeleting || portfolio.length === 0)&& (
                  <div>
                    {stocks.map((stock, index) => (
                      <div key={`stock-${index}`}>
                        <div><strong>{stock.stock_name}</strong></div>
                        <div>{(stock.allocation * 100).toFixed(2)}%</div>
                      </div>
                    ))}

                  {isDeleting && portfolio[0].list_name === listName && (
                    <div>
                      <div>{`Are you sure you want to delete portfolio "${listName}"?`}</div>
                      <button onClick={handleDeletePortfolio}>Yes</button>
                      <button onClick={handleCancelDeletePortfolio}>No</button>
                    </div>
                  )}
                  </div>
                )}

                {isEditing && (portfolio.length > 0) && !isDeleting && (
                  <div>
                    {stocks.map((stock, index) => (
                      <div key={isEditing ? `edit-stock-${index}` : `stock-${index}`}>
                        {portfolio[0].list_name === listName && (
                          <div key={`edit-stock-${index}`}>
                            <div><strong>{stock.stock_name}</strong></div>

                            <label htmlFor={`${listName}-allocation-${index}`} />
                            <input 
                              name={`${listName}-allocation-${index}`} 
                              type="number"
                              value={allocations[index].allocation} 
                              onChange={(e) => handleUpdatedAllocation(e, index)}
                            />
                          </div>
                        )}

                        {portfolio[0].list_name !== listName && (
                          <div key={`stock-${index}`}>
                            <div><strong>{stock.stock_name}</strong></div>
                            <div>{(stock.allocation * 100).toFixed(2)}%</div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div>
                      <button onClick={handleUpdatePortfolio}>Submit Update</button>
                      
                      <button onClick={handleCancelSelection}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isEditing && (!listId) && (
              <div>
                <button onClick={(e) => handlePortfolioUpdateClick(e, listName)}>Update Portfolio</button>
                <button onClick={(e) => handlePortfolioDeleteClick(e, listName)}>Delete Portfolio</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




