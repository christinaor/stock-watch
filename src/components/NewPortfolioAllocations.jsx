import { useState } from 'react';
import { toast } from "react-toastify";

export default function NewPortfolioAllocations(props) {
  const {
    newPortfolio,
    setNewPortfolio,
    newAllocation,
    setNewAllocation,
    setIsIncorrectPercent,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedAllocations, setEditedAllocations] = useState([]);

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
      toast.error("Not all allocation fields were filled - please try again!");
    }
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

  return(
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
        {newPortfolio.allocations.length > 0 && !isEditing &&
          newPortfolio.allocations.map((allocation, index) => (
            <section key={`allocation-${index}`}>
              <h3>{allocation.stockSymbol}</h3>
              <div>{allocation.percentage}</div>
            </section>
          ))}

        {!isEditing && (
          <button className="allocation__btn" onClick={() => setIsEditing(true)}>
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
      </div>
    </section>
  )
}