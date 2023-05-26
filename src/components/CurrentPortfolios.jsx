export default function CurrentPortfolios(props) {
  const {
    currentPortfolios,
  } = props;

  return (
    <div className="folio-list">
      <h2>Current portfolios:</h2>

      {currentPortfolios.map(stock => (
        <div key={`stock-${stock.id}`}>
          <div>{stock.list_name}</div>
          <div>{stock.stock_name}</div>
          <div>{stock.allocation}</div>
        </div>
      ))}
    </div>
  )
}
