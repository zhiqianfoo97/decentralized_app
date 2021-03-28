import React, { useState }  from "react";
// import './page.css';
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
    )

}



export default RegisterPage;