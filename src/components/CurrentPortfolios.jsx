import React, { useState } from 'react';
import '../styles/currentPortfolios.css'

export default function CurrentPortfolios(props) {
  const { currentPortfolios } = props;

  // Create an object to store the collapsed state of each list
  const [collapsedLists, setCollapsedLists] = useState({});

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

  // Set the initial collapsed state for all lists to true
  useState(() => {
    const initialCollapsedLists = Object.keys(stocksByListName).reduce((acc, listName) => {
      acc[listName] = true;
      return acc;
    }, {});
    setCollapsedLists(initialCollapsedLists);
  }, []);

  return (
    <div className="folio-list">
      <h2>Current portfolios:</h2>

      {Object.entries(stocksByListName).map(([listName, stocks]) => (
        <div key={`list-${listName}`} className="list-item">
          <div className="list-header">
            <h3>{listName}</h3>
            <button onClick={() => toggleListCollapse(listName)}>
              {collapsedLists[listName] ? 'Expand +' : 'Collapse -'}
            </button>
          </div>

          {!collapsedLists[listName] && (
            <div>
              {stocks.map((stock, index) => (
                <div key={`stock-${index}`}>
                  <div>{stock.stock_name}</div>
                  <div>{stock.allocation}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}




