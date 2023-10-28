import { Route } from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import Signup from "./components/Authentication/Signup";
import SignIn from "./components/Authentication/SignIn";

function App() {
  return (
    <div className="App">
      <Route path="/signup">
      <Signup/>
      </Route>
      <Route path="/signin">
        <SignIn/>
      </Route>
    </div>
  );
}

export default App;
