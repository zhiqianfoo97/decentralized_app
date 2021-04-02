import React, { useState }  from "react";
const UserPayment = (props) => {

    // return (
    //     <body>
    //         <div id="pageMain">
    //             <div>
    //                 Payment
    //             </div>
    //             <div>
    //                 <div>
    //                     Provider name : {props.pname}
    //                 </div>
    //                 <div>
    //                     Provider Ethereum address : {props.pethAdd}
    //                 </div>
    //                 <div>
    //                     Provider location : {props.plocation}
    //                 </div>
    //                 <div>
    //                     Ether payable : {props.ether}
    //                 </div>
    //                 <button type="submit">Pay</button>
    //             </div>
    //         </div>
    //     </body>


    // )

    return (
        <div className="auth-inner"> 
            <form>
                <h3 class = "title">User Payment</h3>

                <div class = "split-container">
                    <div class = "left-half-container">
                        <div className="form-group">
                            <label>Provider Name: </label> 
                        </div>
                        <div className="form-group long-label">
                            <label>Provider Ethereum Address: </label> 
                        </div>
                        <div className="form-group">
                            <label>Provider Location: </label> 
                        </div>
                        <div className="form-group">
                            <label>Ether Payable: </label> 
                        </div>
                    </div>
                    <div class = "right-half-container">
                        <div className="form-group">
                            <label>Queen's Mary Hospital</label> 
                        </div>
                        <div className="form-group long-label">
                            <label>123124x123912301xasd</label> 
                        </div>
                        <div className="form-group">
                            <label>42, Pokfulam Road, St John's College, Hong Kong</label> 
                        </div>
                        <div className="form-group">
                            <label>$30000</label> 
                        </div>
                    </div>

                </div>
                

                <button type="submit" className="btn btn-primary btn-block result-btn">Pay</button>
            

                
            </form>
        </div>
    );  

}

export default UserPayment;