import React from "react";
import { Dashboard, Login, Welcome, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>  
        <Route path="/" exact={true}>
          <Welcome />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/dashboard" exact={true}>
          <Dashboard></Dashboard>
        </Route>
        <Route path="*">
          <Error></Error>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
