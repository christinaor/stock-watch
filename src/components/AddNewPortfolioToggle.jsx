import AddButton from "./AddButton";

export default function AddNewPortfolioToggle(props) {
  const {
    className,
    handleClick,
    text,
  } = props;

console.log()
  return (
    <div>
      <AddButton 
        className={className}
        handleClick={handleClick}
        text={text}
      />
    </div>
  )
}