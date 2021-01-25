import React, { useState }  from "react";
import './page.css';

const RegisterPage = () => {


    const asUser = (e) => {
        e.preventDefault();
        console.log("Test : " , e.target)

    }

    const asProvider = (e) => {
        e.preventDefault();
    }


    return (
        <body>
            <div id="pageMain">
                <div>
                    REGISTER AS
                </div>
                <div>
                    {/* bottom is just a temp, need to change to router in the future */}
                    <form onSubmit={asUser} id="signupBox"> 
                        <button type="submit">New User</button>
                    </form>
                    <form onSubmit={asProvider} id="signupBox"> 
                        <button type="submit">New Supplier</button>
                    </form>
                </div>
            </div>
        </body>


    )

}

export default RegisterPage;