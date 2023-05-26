import { useContext, useState, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";
import Login from "./components/Login";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Welcome from "./components/Welcome";
import NewPortfolio from "./components/NewPortfolio";
import CurrentPortfolios from "./components/CurrentPortfolios";
import Logout from "./components/Logout";

function App() {
  /**
   * New portfolio is ultimately what is submitted.
   * State needed for allocations, which is added to new portfolio upon submit.
   * All fields must be cleared once the new portfolio is submitted.
   */
  // const userData = useContext(UserContext);
  // TODO - require user to login before altering portfolios on their account
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState(null);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [currentPortfolios, setCurrentPortfolios] = useState([]);

  useEffect(() => {
    const cachedLogin = JSON.parse(localStorage.getItem("user"));
    if (cachedLogin) {
      setUser(cachedLogin);
      setUserId(cachedLogin.id);
      setUsername(cachedLogin.username);
      setIsLoggedIn(true);
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      setUser(currentUser);
      setUserId(currentUser.id);
      setUsername(currentUser.username);
    } else {
      setUser(null);
      setUserId(0);
      setUsername(null);
    }
  }, [loggedIn]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const url = `${import.meta.env.VITE_API_URL}/stocks/`;
        const response = await fetch(url);
        const data = await response.json();
        const userPortfolios = await data.filter(
          (stock) => stock.user_stock === userId
        );
        setCurrentPortfolios(userPortfolios);
        console.log(data);
      };

      fetchData();
    } catch (err) {
      return console.log(`Encountered the following error: ${err}`);
    }
  }, [userId]);

  console.log(user)

  return (
    <div>
      <UserContext.Provider>
        <Header />
        {!user && (
          <Login 
            setIsLoggedIn={setIsLoggedIn}
          />
        )}

        {user && (
          <Logout 
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
        <ToastContainer />
        {user && (
          <main>
            {username && (
              <Welcome
                username={username}
              />
            )}
            <NewPortfolio 
              userId={userId} 
              currentPortfolios={currentPortfolios}
              setCurrentPortfolios={setCurrentPortfolios}
            />

            <CurrentPortfolios
              currentPortfolios={currentPortfolios}
              setCurrentPortfolios={setCurrentPortfolios}
            />
          </main>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
