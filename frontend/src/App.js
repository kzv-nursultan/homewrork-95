import React from "react";
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import MainPage from "./containers/MainPage/MainPage";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import CustomAppBar from "./components/UI/CustomAppBar/CustomAppBar";
import AddCocktails from "./containers/AddCocktails/AddCocktails";
import HistoryCocktail from "./containers/HistoryCocktail/HistoryCocktail";
import OneCocktail from "./containers/OneCocktail/OneCocktail";

function App() {
  const user = useSelector(state => state.users.user);
  const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
      <Route {...props}/> :
      <Redirect to={redirectTo}/>
  };
  return (
    <>
      <CustomAppBar/>
      <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/login' exact component={Login}/>

        <ProtectedRoute
          path='/add'
          component={AddCocktails}
          isAllowed={user._id}
          redirectTo='/'
        />

        <ProtectedRoute
          path='/my_cocktails'
          component={HistoryCocktail}
          isAllowed={user._id}
          redirectTo='/'
        />

        <Route path='/one_cocktail/:id' component={OneCocktail}/>

      </Switch>
    </>
  );
}

export default App;
