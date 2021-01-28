import React, { useState }  from "react";
import './page.css';

// can merge with user with flag depending on props

const ProviderLandingPage = (props) => {

    const goUserInfo = () => {
        console.log("test");
    }

    const goAppointment = () => {
        console.log("test2");
    }

    const goHistory = () => {
        console.log("test3");
    }

    return (
        <body  >
            <div id="userLandingPage">
                <div id="boxInfoOuter">
                    <div className="boxInfo" onClick={() => goUserInfo()}>
                        User
                    </div>
                    <div className="boxInfo" onClick={() => goAppointment()}>
                        Appointment
                    </div>
                    <div className="boxInfo" onClick={()=> goHistory()}> 
                        History
                    </div>
                </div>
                <div>
                    <div>{/* page for covid ingo */}</div>
                </div>
            </div>
        </body>


    )



}

export default ProviderLandingPage;