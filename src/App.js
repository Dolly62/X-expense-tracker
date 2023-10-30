import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { SignIn, Signup, Welcome, Header } from "./components/AllRoutes/Routes";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/home">
          <Welcome />
        </Route>
        <Route path="/signup">{!isLoggedIn && <Signup />}</Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/">
          {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
