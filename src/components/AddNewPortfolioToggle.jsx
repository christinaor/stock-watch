import AddButton from "./AddButton";
import React from 'react'
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