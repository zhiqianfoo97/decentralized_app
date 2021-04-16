import React, { useState }  from "react";
import ProviderIncomingAppointment from "./providerIncomingAppointment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const ProviderAppointmentInfo = (props) => {

    const [pressed, setPressed] = useState(false)

    return (
        <div className="auth-inner">
            <form>
                <h3 className = "title">Appointment Information</h3>

                <div className = "split-container">
                    <div className = "left-half-container">
                        <div className="form-group">
                            <label>Name: </label> 
                        </div>
                        <div className="form-group">
                            <label>Date: </label> 
                        </div>
                        <div className="form-group">
                            <label>HKID: </label> 
                        </div>
                        <div className="form-group">
                            <label>Ethereum Address: </label> 
                        </div>
                    </div>
                    <div className = "right-half-container">
                        <div className="form-group">
                            <label>Foo Zhi Qian</label> 
                        </div>
                        <div className="form-group">
                            <label>13/01/2021</label> 
                        </div>
                        <div className="form-group">
                            <label>M712312(5)</label> 
                        </div>
                        <div className="form-group">
                            <label>123124x123912301xasd</label> 
                        </div>
                    </div>

                </div>
                

                <button type="submit" className="btn btn-primary btn-block result-btn">
                    <Link className="nav-link" to={"/provider-input-result-page"}>Input Result</Link>
                </button>
            

                
            </form>
     </div>
    )
}

export default ProviderAppointmentInfo;