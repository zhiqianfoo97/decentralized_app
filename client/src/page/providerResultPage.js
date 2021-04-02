import React, { useState }  from "react";
const ProviderResultPage = (props) => {


    return (
        
        <div className="auth-inner"> 
            <form>
                <h3 class = "title">User Result</h3>

                <div class = "split-container">
                    <div class = "left-half-container">
                        <div className="form-group">
                            <label>Venue: </label> 
                        </div>
                        <div className="form-group">
                            <label>Date: </label> 
                        </div>
                        <div className="form-group">
                            <label>Name: </label> 
                        </div>
                        <div className="form-group">
                            <label>HKID: </label> 
                        </div>
                        <div className="form-group">
                            <label>Result: </label> 
                        </div>
                    </div>
                    <div class = "right-half-container">
                        <div className="form-group">
                            <label>HKU</label> 
                        </div>
                        <div className="form-group">
                            <label>13/01/2021</label> 
                        </div>
                        <div className="form-group">
                            <label>Foo Zhi Qian</label> 
                        </div>
                        <div className="form-group">
                            <label>M72123(5)</label> 
                        </div>
                        <div className="form-group">
                            <label>********</label> 
                        </div>
                    </div>

                </div>
                

                <button type="submit" className="btn btn-primary btn-block result-btn">Pay to View</button>
            

                
            </form>
        </div>
    );


}

export default ProviderResultPage;