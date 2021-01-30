import React, { useState }  from "react";
import './page.css';
import ProviderIncomingAppointment from "./providerIncomingAppointment";

const ProviderAppointmentInfo = (props) => {

    const [pressed, setPressed] = useState(false)

    return(
        <body>
            <div>
                Appointment Information
            </div>
            <div>
                Name : {props.name}
            </div>
            <div>
                Date : {props.date}
            </div>
            <div>
                HKID : {props.hkid}
            </div>
            <div>
                Ethereum Address : {props.ethAdd}
            </div>
            <div>
                Test result : <input type="text"></input>
            </div>
            {pressed} ? <button onClick = {() => setPressed(true)}>Input result</button> : <button>Send</button>
        </body>
    )



}

export default ProviderAppointmentInfo;