import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const SupplierSignUpPage = () => {
    const initialState = {
        username : "",
        password : "",
        hcare_num : "",
        email : "",
        eth_address : "",
        location: "",
    };

    const [field, setField] = useState(initialState);

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp] : val, 
        })
    }


    //need to improve this, send data to us
    const signUp = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(field));

    }

    
    return (
        <div className="auth-inner2"> 
            <form>
                <h3>New Supplier</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={field.username} placeholder="Enter name" onChange={(e) => changeValue('username', e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Ethereum Address </label>
                    <input type="text" className="form-control" value={field.eth_address} placeholder="Enter Ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Healthcare Provider Number</label>
                    <input type="text" className="form-control" value={field.hcare_num} placeholder="Enter healthcare provider no." onChange={(e) => changeValue('hcare_num', e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" value={field.email} placeholder="Enter email" onChange={(e) => changeValue('email', e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" value={field.location} placeholder="Enter location" onChange={(e) => changeValue('location', e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={field.password} placeholder="Enter password" onChange={(e) => changeValue('password', e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={signUp}>Sign Up</button>
                <p className="forgot-password text-right">
                    {/* Already registered? <Link className="nav-link" to={"/sign-in"}>Sign in</Link> */}
                    Registration will be subjected to manual review.
                </p>
            </form>
        </div>
    );

}



export default SupplierSignUpPage;