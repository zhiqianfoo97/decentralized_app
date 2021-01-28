import React, { useState }  from "react";
import './page.css';

const UserMakeAppointment = () => {



    return(
        <body>
            <div>
                Appointment
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Places"></input>
                </div>
                <div>
                    Pick a date placeholder
                </div>
            </div>
            <div>
                Pick a time placeholder
            </div>
            <div>
                <form>
                    <button type="submit">Set appointment</button>
                </form>
            </div>
        </body>
    )


}

export default UserMakeAppointment;