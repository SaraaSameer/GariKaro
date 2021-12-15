import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Screens/Signupscreen/Signup";
import Login from "./components/Screens/Loginscreen/Login";
import UserForum from "../src/components/Screens/UserForum/UserForum";
import DriverMain from "./components/Screens/DriverMain/DriverMain";
import DriverMain2 from "./components/Screens/DriverMain/StepTwo";
import NotFound from './components/Screens/NotFound'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Screens/Homepage/Home";
import Navbar from "./components/Screens/Navbar/Navbar";
import DriverMainStep2 from './components/Screens/DriverMain/StepTwo';
import { useState, useEffect, useContext } from "react";
import AuthContext from "./components/store/auth-context";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    localStorage.setItem("Is logged in", "1"); //1 for loggedin user
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkIfUserLoggedIn = localStorage.getItem("Is logged in");
    if (checkIfUserLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("Is logged in");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ logUser: isLoggedIn, onLogOutUser: logoutHandler }}
    >
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>

        <Route path="/login" exact>
          <Login onLogin={loginHandler} />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/driver" exact>
          <DriverMain />
        </Route>

        <Route path="/driver2" exact>
          <DriverMainStep2/> 
          </Route> 
          
        <Route exact path="/user">
          {/* {!Authorized ? <Redirect to="/" /> : <UserForum />}  */}
          <UserForum />
        </Route>

        {/* default case for no page found  */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
