import React from 'react'
export default function NewPortfolioDetails(props) {
  const {
    newPortfolio,
    setNewPortfolio,
  } = props;

  return (
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
  );
};