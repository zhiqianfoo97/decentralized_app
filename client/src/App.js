import React from "react";
import UserResultPage from './page/userResultPage';
import ProviderInputResultPage from './page/providerInputResultPage';
import ProviderLandingPage from './page/providerLandingPage';
import UserPayment from './page/userPayment'
import UserLandingPage from './page/userLandingPage';
import UserHistory from './page/userHistory';
import ProviderHistory from './page/providerHistory';
import ProviderIncomingAppointment from './page/providerIncomingAppointment';
import ProviderAppointmentInfo from './page/providerAppointmentInfo';
import UserInfoPage from './page/userInfo';
import Login from './page/loginPage';
import UserSignUp from './page/userSignUpPage';
import SupplierSignUp from './page/supplierSignUpPage';
import Register from './page/registerUser';
import UserMakeAppointment from './page/userMakeAppointment'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user-sign-up" component={UserSignUp} />
            <Route path="/supplier-sign-up" component={SupplierSignUp} />
            <Route path="/user-landing-page" component={UserLandingPage} />
            <Route path="/user-make-appointment" component={UserMakeAppointment} />\
            <Route path="/user-history" component={UserHistory} />
            <Route path="/user-result-page" component={UserResultPage} />
            <Route path="/user-payment-page" component={UserPayment} />
            <Route path="/user-info-page" component={UserInfoPage} />
            <Route path="/provider-incoming-appointment-page" component={ProviderIncomingAppointment} />
            <Route path="/provider-history" component={ProviderHistory} />
            <Route path="/provider-appointment-info" component={ProviderAppointmentInfo} />
            <Route path="/provider-input-result-page" component={ProviderInputResultPage} />
            <Route path="/provider-landing-page" component={ProviderLandingPage} />
          </Switch>
        
      </div>
    </div></Router>
  );
}

export default App;