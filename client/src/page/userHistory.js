import React, { useState }  from "react";

const UserHistory = (props) => {

    // const resultArray = []
    // const appointmentArray = []

    // const [choice, setChoice] = useState(true)

    // const results = () => {
    //     return(
    //         <div className="userResult">
    //             <div>
    //                 Date:
    //             </div>
    //             <div>
    //                 Result:
    //             </div>
    //             <div>
    //                 Venue:
    //             </div>
    //         </div>
    //     )
    // }

    // const appointment = () => {
    //     return(
    //         <div className="userResult">
    //             <div>
    //                 Date:
    //             </div>
    //             <div>
    //                 Venue:
    //             </div>
    //         </div>
    //     )
    // }

    // //need to change below
    // for(let i = 0; i < 5; i++){
    //     resultArray.push(results());
    //     appointmentArray.push(appointment());
    // }   

    // return(
    //     <body>
    //         <div>History</div>
    //         <div id="userHistoryRow">
    //             <div onClick = {()=> setChoice(true)}>
    //                 Appointment
    //             </div>
    //             <div onClick = {()=> setChoice(false)}>
    //                 Result
    //             </div>
    //         </div>
    //         {choice ? appointmentArray : resultArray }
    //     </body>
        

    // )

    const appointment = () => {
        return(
            <div className="userAppointment">
                   <div className = "column_container">
                        <div className="form-group border-bottom">
                            <label>Venue: HKU </label> 
                            <label>Date: 03/01/2021 </label> 
                        </div>
                    </div>
                    
                    <div className = "column_container">
                        <div className="form-group border-bottom">
                            <label>Venue: Queen's Mary Hospital </label> 
                            <label>Date: 03/01/2021 </label> 
                        </div>
                    </div>
                    
                    <div className = "column_container">
                        <div className="form-group border-bottom">
                            <label>Venue: Lai Chi Kok </label> 
                            <label>Date: 03/01/2021 </label> 
                        </div>
                    </div>

                    <div className = "column_container">
                        <div className="form-group">
                            <label>Venue: Mong Kok </label> 
                            <label>Date: 03/01/2021 </label> 
                        </div>
                    </div>
            </div>
        )
    }

    return (
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

    )


}

export default UserHistory;