import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const UserSignUpPage = () => {
    const initialState = {
        username : "",
        password : "",
        hkid : "",
        email : "",
        eth_address : "",
    };

    const [field, setField] = useState(initialState);

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp] : val, 
        })
    }


    //need to improve this
    const signUp = (e) => {
        e.preventDefault();
        console.log("Test : " , e.target)

    }

    
    return (
        <div className="auth-inner"> 
            <form>
                <h3>New User</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={field.username} className="form-control" placeholder="Enter username" onChange={(e) => changeValue('username', e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Ethereum Address</label>
                    <input type="text" value={field.eth_address} className="form-control" placeholder="Enter ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>HKID / Passport Number</label>
                    <input type="text" value={field.hkid} className="form-control" placeholder="Enter hkid or passport no." onChange={(e) => changeValue('hkid', e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={field.password} className="form-control" placeholder="Enter password" onChange={(e) => changeValue('password', e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </p>
            </form>
        </div>
    );


}



export default UserSignUpPage;