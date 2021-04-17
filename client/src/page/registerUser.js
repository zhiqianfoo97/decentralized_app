import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const RegisterPage = () => {


    const asUser = (e) => {
        e.preventDefault();
        console.log("Test : " , e.target)

    }

    const asProvider = (e) => {
        e.preventDefault();
    }


    return (
        <>
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
        <div className="auth-inner"> 
            <div >
                <h3>
                    Register As
                </h3>
                <div>
                    <button type="submit" className="btn custom-button btn-block">
                        <Link className="nav-link" to={"/user-sign-up"}>New User</Link>
                    </button>

                    <button type="submit" className="btn custom-button btn-block">
                        <Link className="nav-link" to={"/supplier-sign-up"}>New Supplier</Link>
                    </button>
                    
                </div>
            </div>
        </div>
        </div>
        </>
    )

}



export default RegisterPage;