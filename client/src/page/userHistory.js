import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const UserHistory = (props) => {


    // const appointment = () => {
    //     return(
    //     <>
    //     <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    //         <div className="container">

    //         <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
    //         <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    //             <ul className="navbar-nav ml-auto">
                
    //                 <li className="nav-item">

    //                 <Link className="nav-link" to={"/sign-in"}>Log Out</Link>
    //                 </li>
                    
    //             </ul>

    //         </div>
    //         </div>
    //     </nav>

    //   <div className="auth-wrapper">
    // //         <div className="userAppointment">
    // //                <div className = "column_container">
    // //                     <div className="form-group border-bottom">
    // //                         <label>Venue: HKU </label> 
    // //                         <label>Date: 03/01/2021 </label> 
    // //                     </div>
    // //                 </div>
                    
    // //                 <div className = "column_container">
    // //                     <div className="form-group border-bottom">
    // //                         <label>Venue: Queen's Mary Hospital </label> 
    // //                         <label>Date: 03/01/2021 </label> 
    // //                     </div>
    // //                 </div>
                    
    // //                 <div className = "column_container">
    // //                     <div className="form-group border-bottom">
    // //                         <label>Venue: Lai Chi Kok </label> 
    // //                         <label>Date: 03/01/2021 </label> 
    // //                     </div>
    // //                 </div>

    // //                 <div className = "column_container">
    // //                     <div className="form-group">
    // //                         <label>Venue: Mong Kok </label> 
    // //                         <label>Date: 03/01/2021 </label> 
    // //                     </div>
    // //                 </div>
    // //         </div>
    //         </div>
    //         </>
    // //     )
    // // }

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
                <h3 >History</h3>

                <div className= "side-by-side-button">
                    <button type="submit" className="btn custom-button">
                        Appointments
                    </button>

                    <button type="submit" className="btn custom-button">
                        Results
                    </button>
                </div>

                <div className = "column_container">
                    <div className="form-group border-bottom">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> <br></br>
                        <label>Result: Positive</label>
                    </div>
                </div>
                
                <div className = "column_container">
                    <div className="form-group border-bottom">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> <br></br>
                        <label>Result: Positive</label>
                    </div>
                </div>
                
                <div className = "column_container">
                    <div className="form-group border-bottom">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> <br></br>
                        <label>Result: Positive</label>
                    </div>
                </div>

                <div className = "column_container">
                    <div className="form-group">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> <br></br>
                        <label>Result: Positive</label>
                    </div>
                </div>

            
                
            </form>
        </div>
    </div>
    </>

    )


}

export default UserHistory;