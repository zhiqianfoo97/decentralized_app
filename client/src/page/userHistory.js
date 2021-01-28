import React, { useState }  from "react";
import './page.css';

const UserHistory = (props) => {

    const resultArray = []
    const appointmentArray = []

    const [choice, setChoice] = useState(true)

    const results = () => {
        return(
            <div className="userResult">
                <div>
                    Date:
                </div>
                <div>
                    Result:
                </div>
                <div>
                    Venue:
                </div>
            </div>
        )
    }

    const appointment = () => {
        return(
            <div className="userResult">
                <div>
                    Date:
                </div>
                <div>
                    Venue:
                </div>
            </div>
        )
    }

    //need to change below
    for(let i = 0; i < 5; i++){
        resultArray.push(results());
        appointmentArray.push(appointment());
    }   

    return(
        <body>
            <div>History</div>
            <div id="userHistoryRow">
                <div onClick = {()=> setChoice(true)}>
                    Appointment
                </div>
                <div onClick = {()=> setChoice(false)}>
                    Result
                </div>
            </div>
            {choice ? appointmentArray : resultArray }
        </body>
        

    )


}

export default UserHistory;