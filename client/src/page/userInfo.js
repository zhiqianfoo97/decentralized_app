import React, { useState }  from "react";
import './page.css';

const UserInfo = (props) => {

    return (
        <body>
            <div id="pageMain">
                <div>
                    User Information
                </div>
                <div>
                    <div>
                        Username : {props.username}
                    </div>
                    <div>
                        Name : {props.name}
                    </div>
                    <div>
                        Ethereum address : {props.ethAdd}
                    </div>
                    <div>
                        Ether balance : {props.ether}
                    </div>
                    <div>
                        {/* insert qr code here */}
                    </div>
                </div>
            </div>
        </body>


    )

}

export default UserInfo;