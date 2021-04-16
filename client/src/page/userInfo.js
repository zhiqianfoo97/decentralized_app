import React, { useState }  from "react";
import qrcode from '../qrcode.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const UserInfo = (props) => {

    // return (
    //     <body>
    //         <div id="pageMain">
    //             <div>
    //                 User Information
    //             </div>
    //             <div>
    //                 <div>
    //                     Username : {props.username}
    //                 </div>
    //                 <div>
    //                     Name : {props.name}
    //                 </div>
    //                 <div>
    //                     Ethereum address : {props.ethAdd}
    //                 </div>
    //                 <div>
    //                     Ether balance : {props.ether}
    //                 </div>
    //                 <div>
    //                     {/* insert qr code here */}
    //                 </div>
    //             </div>
    //         </div>
    //     </body>


    // )

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
                <h3 className = "title">User Information</h3>

                <div className = "split-container">
                    <div className = "left-half-container">
                        <div className="form-group">
                            <label>Username: </label> 
                        </div>
                        <div className="form-group">
                            <label>Name: </label> 
                        </div>
                        <div className="form-group">
                            <label>Ethereum Address: </label> 
                        </div>
                        <div className="form-group">
                            <label>Ether Balance: </label> 
                        </div>
                    </div>
                    <div className = "right-half-container">
                        <div className="form-group">
                            <label>zhiqian97</label> 
                        </div>
                        <div className="form-group">
                            <label>Foo Zhi Qian</label> 
                        </div>
                        <div className="form-group">
                            <label>123124x123912301xasd</label> 
                        </div>
                        <div className="form-group">
                            <label>$300</label> 
                        </div>
                    </div>

                </div>
                

                <div className="form-group">
                    <img className = "qrCode" src={qrcode} alt="QrCode" />
                </div>
            

                
            </form>
        </div>
    </div>
    </>
    );

}

export default UserInfo;