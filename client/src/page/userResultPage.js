import React, { useState }  from "react";
import './page.css';

const UserResultPage = (props) => {

    return (
        <body>
            <div id="pageMain">
                <div>
                    Result
                </div>
                <div>
                    <div>
                        Venue : {props.venue}
                    </div>
                    <div>
                        Date : {props.date}
                    </div>
                    <div>
                        Name : {props.name}
                    </div>
                    <div>
                        HKID : {props.hkid}
                    </div>
                    <div>
                        Result : {props.result}
                    </div>

                    <button type="submit">Pay to view</button>
                </div>
            </div>
        </body>


    )

}

export default UserResultPage;