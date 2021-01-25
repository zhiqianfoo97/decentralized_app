import React, { useState }  from "react";
import './page.css';

const UserPayment = (props) => {

    return (
        <body>
            <div id="pageMain">
                <div>
                    Payment
                </div>
                <div>
                    <div>
                        Provider name : {props.pname}
                    </div>
                    <div>
                        Provider Ethereum address : {props.pethAdd}
                    </div>
                    <div>
                        Provider location : {props.plocation}
                    </div>
                    <div>
                        Ether payable : {props.ether}
                    </div>
                    <button type="submit">Pay</button>
                </div>
            </div>
        </body>


    )

}

export default UserPayment;