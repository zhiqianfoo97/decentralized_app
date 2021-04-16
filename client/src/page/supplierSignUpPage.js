import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const SupplierSignUpPage = () => {
    const initialState = {
        username : "",
        password : "",
        hkid : "",
        email : "",
        ethAdd : "",
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
            <form>
                <h3>New Supplier</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" />
                </div>

                <div className="form-group">
                    <label>Address </label>
                    <input type="text" className="form-control" placeholder="Enter address" />
                </div>

                <div className="form-group">
                    <label>Healthcare Provider Number</label>
                    <input type="text" className="form-control" placeholder="Enter healthcare provider no." />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </p>
            </form>
        </div>
        </div>
        </>
    );



    // onChange = { (e) => setField({...field, temp : val})}
    // return (
    //     <body>
    //         <div id="pageMain">
    //             <div>
    //                 NEW USER
    //             </div>
    //             <div>
    //                 <form onSubmit={signUp} id="signupBox"> 
    //                     <input type="text" placeholder="Username"  onChange={(e) => changeValue('username', e.target.value)}/>
    //                     <input type="text" placeholder="Ethereum address"  onChange={(e) => changeValue('ethAdd', e.target.value)}/>
    //                     <input type="text"  placeholder="HKID / Passport number" onChange={(e) => changeValue('hkid', e.target.value)}/>
    //                     <input type="text"  placeholder="Email address" onChange={(e) => changeValue('email', e.target.value)}/>
    //                     <input type="password" placeholder="Password" onChange={(e) => changeValue('password', e.target.value)}/>
    //                     <button type="submit">Sign Up</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </body>

        


    // )
}



export default SupplierSignUpPage;