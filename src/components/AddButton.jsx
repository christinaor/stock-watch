export default function AddButton(props) {
  const {
    className = '', 
    handleClick, 
    text = '' 
  } = props;

  return (
    <button 
      className={`${className}`} 
      onClick={handleClick}
    >
      {`+ ${text}`}
    </button>
  );
};