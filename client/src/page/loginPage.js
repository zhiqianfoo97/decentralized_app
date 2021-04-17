import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const LoginPage = () => {

    const [showUser, setShowUser] = useState(false);
    const [showProvider, setShowProvider] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = (e) => {
        e.preventDefault();
        localStorage.setItem("user_type","user");
        localStorage.setItem("name", "test");
        localStorage.setItem("username", username);
        localStorage.setItem("eth_address", "0x501a19d036cD7DA7E353AD194bA08642cD560978");
        localStorage.setItem("logged", true);
        localStorage.setItem("hkid", "m1234123");

    }

    const loginProvider = (e) => {
        e.preventDefault();
        localStorage.setItem("user_type","provider");
        localStorage.setItem("name", "test2");
        localStorage.setItem("username", username);
        localStorage.setItem("eth_address", "0x501a19d036cD7DA7E353AD194bA08642cD560978");
        localStorage.setItem("location", "xx");
        localStorage.setItem("email", "zxxc@porkmail.com");

    }

    const openUser = (e) => {
        e.preventDefault();
        setShowAll(false);
        setShowUser(true);
        
    }

    const openProvider = (e) =>{
        e.preventDefault();
        setShowAll(false);
        setShowProvider(true);
        
    }

    const closeAll = (e) =>{
        e.preventDefault();
        setShowUser(false);
        setShowProvider(false);
        setShowAll(true);
    }

    const handleUserChanges = (e) =>{
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handlePasswordChanges = (e) =>{
        e.preventDefault();
        setPassword(e.target.value);
    }


    
    return (
        <div className="auth-inner">
            {showAll ? "" : <button id="back-button" onClick={closeAll}> Back </button> }
            <form>
                <h3>Sign In As</h3>
                
                {showAll ? 
                    <div className="login-page-button">
                        
                        <button className="login-page-button-unit" onClick={openUser}>
                            User
                        </button>
                        <button className="login-page-button-unit" onClick={openProvider}>
                            Test Provider
                        </button>
                            
                        
                    </div>
                : "" }
                
                
                {showUser ?

                    <div id="user-login">
                        <h3>User</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username" value={username} onChange={handleUserChanges}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={handlePasswordChanges} />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={loginUser}>
                            <Link className="nav-link" to={"/user-landing-page"}>Submit</Link>
                        </button>
                    
                    </div>
                
                : ""}

                {showProvider ?
                
                    <div id="provider-login">
                        <h3>Provider</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username"  value={username} onChange={handleUserChanges}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={handlePasswordChanges} />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={loginProvider}>
                            <Link className="nav-link" to={"/provider-landing-page"}>Submit</Link>
                        </button>
                        
                    </div>
                : ""}

            </form>
        </div>
    );

}

export default LoginPage;