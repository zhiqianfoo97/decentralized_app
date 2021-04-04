import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const ProviderIncomingAppointment = () => {

    // const appointmentArray = []

    // const appointment = () =>{
    //     return(
    //         <div className="padding10">
    //             <div>
    //                 Ethereum address : 
    //             </div>
    //             <div>
    //                 Date : 
    //             </div>
    //         </div>
    //     )
    // }

    // for(let i = 0; i < 5; i++){
    //     appointmentArray.push(appointment());
    // }

    // return(
    //     <body>
    //         <div>
    //             Incoming Appointment
    //         </div>
    //         <div>
    //             <input type="text" placeholder="Ethereum address"></input>
    //         </div>
    //         {appointmentArray}

    //     </body>
    // )

    return (
        <div className="auth-inner"> 
            <form>
                
                <h3 >Incoming Appointment</h3>

                <input name="text" className = "search-bar" type="text" placeholder="Search" />

                <div className = "column_container">
                    <Link to={"/provider-appointment-info"}>
                        <div className="form-group border-bottom">
                                <label className="appointment-info">Ethereum Address: 123124x123912301xasd </label> 
                                <label className="appointment-info">Date: 03/01/2021 </label>                             
                        </div>
                    </Link>
              </div>
                <div className = "column_container">
                        <Link to={"/provider-appointment-info"}>
                            <div className="form-group border-bottom">
                                    <label className="appointment-info">Ethereum Address: 123124x123912301xasd </label> 
                                    <label className="appointment-info">Date: 03/01/2021 </label>                             
                            </div>
                        </Link>
                </div>
                <div className = "column_container">
                        <Link to={"/provider-appointment-info"}>
                            <div className="form-group border-bottom">
                                    <label className="appointment-info">Ethereum Address: 123124x123912301xasd </label> 
                                    <label className="appointment-info">Date: 03/01/2021 </label>                             
                            </div>
                        </Link>
                </div>
                <div className = "column_container">
                        <Link to={"/provider-appointment-info"}>
                            <div className="form-group border-bottom">
                                    <label className="appointment-info">Ethereum Address: 123124x123912301xasd </label> 
                                    <label className="appointment-info">Date: 03/01/2021 </label>                             
                            </div>
                        </Link>
                </div>
                
                
            </form>
        </div>

    )
    


}

export default ProviderIncomingAppointment;
