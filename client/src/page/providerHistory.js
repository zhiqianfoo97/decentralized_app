import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
           
      <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">

          <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
              
                  <li className="nav-item">

                  <Link className="nav-link" to={"/sign-in"}>Log Out</Link>
                  </li>
                  
              </ul>

          </div>
          </div>
      </nav>

    <div className="auth-wrapper">
            <div className="auth-inner"> 
                <form>
                    <h3 >History</h3>

                    <div className = "column_container">
                        <div className="form-group border-bottom">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>
                    
                    <div className = "column_container">
                        <div className="form-group border-bottom">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>
                    
                    <div className = "column_container">
                        <div className="form-group border-bottom">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>

                    <div className = "column_container">
                        <div className="form-group">
                            <label>Ethereum Address: 123124x123912301xasd </label> 
                            <label>Date: 03/01/2021 </label> <br></br>
                            <label>Result: ***</label>
                        </div>
                    </div>

                
                    
                </form>
             </div>
             </div>
             </>
    )
}

export default ProviderHistory;