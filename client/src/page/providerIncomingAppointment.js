import React, { useState }  from "react";
import './page.css';

const ProviderIncomingAppointment = () => {

    const appointmentArray = []

    const appointment = () =>{
        return(
            <div className="padding10">
                <div>
                    Ethereum address : 
                </div>
                <div>
                    Date : 
                </div>
            </div>
        )
    }

    for(let i = 0; i < 5; i++){
        appointmentArray.push(appointment());
    }

    return(
        <body>
            <div>
                Incoming Appointment
            </div>
            <div>
                <input type="text" placeholder="Ethereum address"></input>
            </div>
            {appointmentArray}

        </body>
    )



}

export default ProviderIncomingAppointment;
