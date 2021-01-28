import React, { useState }  from "react";
import './page.css';

const UserLandingPage = (props) => {

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
                        Make Appointment
                    </div>
                    <div className="boxInfo" onClick={()=> goHistory()}> 
                        History
                    </div>
                </div>
                <div>
                    <button type="submit">Latest test result</button>
                    <div>{/* page for covid ingo */}</div>
                </div>
            </div>
        </body>


    )



}

export default UserLandingPage;