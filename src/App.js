import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { SignUp } from "./Components/SignUp/SignUp";
import { BlueBucks } from "./Components/BlueBucks/BlueBucks";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { Profile } from "./Components/Profile/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/blueBucks" component={BlueBucks} />
        <Route path="/signUp" component={SignUp}/>
        <Route path="/login" component={Login} />     
      </Switch>
    </BrowserRouter>

  );
}

export default App;