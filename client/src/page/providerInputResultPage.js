import React, { useState }  from "react";

const ProviderInputResultPage = (props) => {

    const [pressed, setPressed] = useState(false)

    // return(
    //     <body>
    //         <div>
    //             Appointment Information
    //         </div>
    //         <div>
    //             Name : {props.name}
    //         </div>
    //         <div>
    //             Date : {props.date}
    //         </div>
    //         <div>
    //             HKID : {props.hkid}
    //         </div>
    //         <div>
    //             Ethereum Address : {props.ethAdd}
    //         </div>
    //         <div>
    //             Test result : <input type="text"></input>
    //         </div>
    //         {pressed} ? <button onClick = {() => setPressed(true)}>Input result</button> : <button>Send</button>
    //     </body>
    // )

    return (
        <div className="auth-inner"> 
            <form>
                <h3 className = "title">Input Result</h3>

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
                        <div className="form-group medium-label">
                            <label>Ethereum Address: </label> 
                        </div>
                        <div className="form-group">
                            <label>Test Result: </label> 
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
                        <div className="form-group medium-label">
                            <label>123124x123912301xasd</label> 
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter test result" />
                        </div>
                    </div>

                </div>
                

                <button type="submit" className="btn btn-primary btn-block result-btn">Confirm</button>
            

                
            </form>
        </div>

    )
}

export default ProviderInputResultPage;