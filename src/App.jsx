import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";
import Login from "./components/Login";
// import LineChart from "./components/LineChart";
// import PieChart from "./components/PieChart";
// import Login from "./components/Login";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Welcome from "./components/Welcome";
import NewPortfolio from "./components/NewPortfolio";
import CurrentPortfolios from "./components/CurrentPortfolios";

function App() {
  /**
   * New portfolio is ultimately what is submitted.
   * State needed for allocations, which is added to new portfolio upon submit.
   * All fields must be cleared once the new portfolio is submitted.
   */
  // const userData = useContext(UserContext);
  // TODO - require user to login before altering portfolios on their account
  const user = JSON.parse(localStorage.getItem('user'));

  // const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState(null);
  const [currentPortfolios, setCurrentPortfolios] = useState([]);

  useEffect(() => {
    if (user) {
      console.log(user)
      setUserId(user.id);
      setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const url = `${import.meta.env.VITE_API_URL}/stocks/`;
        const response = await fetch(url);
        const data = await response.json();
        const userPortfolios = await data.filter(stock => stock.user_stock === userId)
        setCurrentPortfolios(userPortfolios);
        console.log(data);
      };

      fetchData();
    } catch (err) {
      return console.log(`Encountered the following error: ${err}`);
    }
  }, [userId]);

  return (
    <div>
      <UserContext.Provider>
        <Header />
        <Login />
        <ToastContainer />
        <main>
          <Welcome
            username={username}
          />

          <NewPortfolio
            userId={userId}
          />

          <CurrentPortfolios
            currentPortfolios={currentPortfolios}
          />

          <div>
            <h2>charts:</h2>
            {/* <LineChart />
            <PieChart /> */}
          </div>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
