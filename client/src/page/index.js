import LoginPage from './loginPage';
import RegisterPage from './registerUser';
import PSignupPage from './providerSignupPage';
import UserResultPage from './userResultPage';
import UserSignupPage from './userSignUpPage';
import UserInfo from './userInfo';
import UserPayment from './userPayment';
import UserLandingPage from './userLandingPage';
import UserHistory from './userHistory';
import ProviderHistory from './providerHistory';
import ProviderIncomingAppointment from './providerIncomingAppointment'

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();