import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import {
  SignIn,
  Signup,
  Welcome,
  Header,
  Profile,
  EmailVer,
} from "./components/AllRoutes/Routes";
import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import { useEffect } from "react";
import { fetchExpense } from "./store/ExpenseActionCreator";
import { expenseActions } from "./store/ExpensesReducer";
import { fetchCategories } from "./store/CategoryActionCreator";
import { categoryActions } from "./store/CategoryReducer";
import CustomCategoriesList from "./components/Expenses/CustomCategoriesList";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchExpense());
      dispatch(fetchCategories());
    } else {
      dispatch(expenseActions.clearExpensesState());
      dispatch(categoryActions.clearCategories());
    }
  });
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/home">
          <Welcome />
        </Route>
        <Route path="/profile">
          {isLoggedIn && <Profile />}
          {!isLoggedIn && <Redirect to="signin" />}
        </Route>
        <Route path="/expenses">
          {isLoggedIn && <ExpenseForm />}
          {!isLoggedIn && <Redirect to="signin" />}
        </Route>
        <Route path="/customcategories">
          {isLoggedIn && <CustomCategoriesList />}
          {!isLoggedIn && <Redirect to="signin" />}
        </Route>
        <Route path="/signup">{!isLoggedIn && <Signup />}</Route>
        <Route path="/signin">{!isLoggedIn && <SignIn />}</Route>
        <Route path="/signin">{!isLoggedIn && <SignIn />}</Route>
        <Route path="/email-verification">{isLoggedIn && <EmailVer />}</Route>
        <Route path="/">
          {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
