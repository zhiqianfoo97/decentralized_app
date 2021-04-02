import React, { useState }  from "react";
import qrcode from '../qrcode.png';

const UserInfo = (props) => {

    // return (
    //     <body>
    //         <div id="pageMain">
    //             <div>
    //                 User Information
    //             </div>
    //             <div>
    //                 <div>
    //                     Username : {props.username}
    //                 </div>
    //                 <div>
    //                     Name : {props.name}
    //                 </div>
    //                 <div>
    //                     Ethereum address : {props.ethAdd}
    //                 </div>
    //                 <div>
    //                     Ether balance : {props.ether}
    //                 </div>
    //                 <div>
    //                     {/* insert qr code here */}
    //                 </div>
    //             </div>
    //         </div>
    //     </body>


    // )

    return (
        <div className="auth-inner"> 
            <form>
                <h3 class = "title">User Information</h3>

                <div class = "split-container">
                    <div class = "left-half-container">
                        <div className="form-group">
                            <label>Username: </label> 
                        </div>
                        <div className="form-group">
                            <label>Name: </label> 
                        </div>
                        <div className="form-group">
                            <label>Ethereum Address: </label> 
                        </div>
                        <div className="form-group">
                            <label>Ether Balance: </label> 
                        </div>
                    </div>
                    <div class = "right-half-container">
                        <div className="form-group">
                            <label>zhiqian97</label> 
                        </div>
                        <div className="form-group">
                            <label>Foo Zhi Qian</label> 
                        </div>
                        <div className="form-group">
                            <label>123124x123912301xasd</label> 
                        </div>
                        <div className="form-group">
                            <label>$300</label> 
                        </div>
                    </div>

                </div>
                

                <div className="form-group">
                    <img class = "qrCode" src={qrcode} alt="QrCode" />
                </div>
            

                
            </form>
        </div>
    );

}

export default UserInfo;