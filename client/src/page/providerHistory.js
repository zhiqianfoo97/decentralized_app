import React, { useState }  from "react";
const ProviderHistory = (props) => {

    // const resultArray = []

    // const results = () => {
    //     return(
    //         <div className="userResult">
    //             <div>
    //                 Ethereum address:
    //             </div>
    //             <div>
    //                 Result:
    //             </div>
    //             <div>
    //                 Date:
    //             </div>
    //         </div>
    //     )
    // }

    // for(let i = 0; i < 5; i++){
    //     resultArray.push(results());
    // }

    // return(
    //     <body>
    //         <div>History</div>
    //         <input type="text" placeholder="Ethereum address"></input>
    //         {resultArray}
    //     </body>
        

    // )
   

    
       return (
            <div className="auth-inner"> 
                <form>
                    <h3 >History</h3>

                    <div class = "row_container">
                        <div className="form-group border-bottom">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>
                    
                    <div class = "row_container">
                        <div className="form-group border-bottom">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>
                    
                    <div class = "row_container">
                        <div className="form-group border-bottom">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>

                    <div class = "row_container">
                        <div className="form-group">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>

                
                    
                </form>
             </div>
    )
}

export default ProviderHistory;