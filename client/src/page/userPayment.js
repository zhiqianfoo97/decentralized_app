import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const UserPayment = (props) => {

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">

            <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                
                    <li className="nav-item">

                    <Link className="nav-link" to={"/sign-in"}>Log Out</Link>
                    </li>
                    
                </ul>

            </div>
            </div>
        </nav>

      <div className="auth-wrapper">
        <div className="auth-inner"> 
            <form>
                <h3 className = "title">User Payment</h3>

                <div className = "split-container">
                    <div className = "left-half-container">
                        <div className="form-group">
                            <label>Provider Name: </label> 
                        </div>
                        <div className="form-group long-label">
                            <label>Provider Ethereum Address: </label> 
                        </div>
                        <div className="form-group">
                            <label>Provider Location: </label> 
                        </div>
                        <div className="form-group">
                            <label>Ether Payable: </label> 
                        </div>
                    </div>
                    <div className = "right-half-container">
                        <div className="form-group">
                            <label>Queen's Mary Hospital</label> 
                        </div>
                        <div className="form-group long-label">
                            <label>123124x123912301xasd</label> 
                        </div>
                        <div className="form-group">
                            <label>42, Pokfulam Road, St John's College, Hong Kong</label> 
                        </div>
                        <div className="form-group">
                            <label>$30000</label> 
                        </div>
                    </div>

                </div>
                

                <button type="submit" className="btn btn-primary btn-block result-btn">Pay</button>
            

                
            </form>
        </div>
    </div>
    </>
    );  

}

export default UserPayment;