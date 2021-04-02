import React, { useState }  from "react";

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

                <input name="text" class = "search-bar" type="text" placeholder="Search" />

                <div class = "row_container">
                    <div className="form-group border-bottom">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> 
                    </div>
                </div>
                
                <div class = "row_container">
                    <div className="form-group border-bottom">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> 
                    </div>
                </div>
                
                <div class = "row_container">
                    <div className="form-group border-bottom">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> 
                    </div>
                </div>

                <div class = "row_container">
                    <div className="form-group">
                        <label>Ethereum Address: 123124x123912301xasd </label> 
                        <label>Date: 03/01/2021 </label> 
                    </div>
                </div>

            </form>
        </div>

    )
    


}

export default ProviderIncomingAppointment;
