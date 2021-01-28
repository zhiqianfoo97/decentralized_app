import React, { useState }  from "react";
import './page.css';

const ProviderHistory = (props) => {

    const resultArray = []

    const results = () => {
        return(
            <div className="userResult">
                <div>
                    Ethereum address:
                </div>
                <div>
                    Result:
                </div>
                <div>
                    Date:
                </div>
            </div>
        )
    }

    for(let i = 0; i < 5; i++){
        resultArray.push(results());
    }

    return(
        <body>
            <div>History</div>
            <input type="text" placeholder="Ethereum address"></input>
            {resultArray}
        </body>
        

    )
}

export default ProviderHistory;