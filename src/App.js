import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { Home } from "./Components/Home/Home";
import { BlueBucks } from "./Components/BlueBucks/BlueBucks";
import { Estimates } from "./Components/Estimates/Estimates";
import { Services } from "./Components/Services/Services";
import { ThankYou } from "./Components/Estimates/ThankYou";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/thankYou" component={ThankYou} />
        <Route path="/services" component={Services} />
        <Route path="/estimates" component={Estimates} />
        <Route path="/blueBucks" component={BlueBucks} />
        <Route path="/home" component={Home} />
        <Route path="/signUp">
          <SignUp showError={updateErrorMessage} updateTitle={updateTitle} />
        </Route>
        <Route path="/" component={Login} />     
      </Switch>
    </BrowserRouter>

  );
}

export default App;