import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

//import des routes
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//import des composents
import Header from "./components/Header";
import Loader from "./components/Loader";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const [search, setSearch] = useState("");
  const [sortByPriceAscending, setSortByPriceAscending] = useState(false);

  const handleToggleSort = (newSortValue) => {
    setSortByPriceAscending(newSortValue);
  };

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  return (
    <>
      <Router>
        <Header
          handleToken={handleToken}
          userToken={userToken}
          search={search}
          setSearch={setSearch}
          handleSort={handleToggleSort}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                sortByPriceAscending={sortByPriceAscending}
                loader={<Loader />}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer userToken={userToken} />} />
          <Route
            path="/signup"
            element={<SignUp handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish userToken={userToken} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
