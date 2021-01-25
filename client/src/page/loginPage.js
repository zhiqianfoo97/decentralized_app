import React, { useState }  from "react";
import './page.css';

const LoginPage = () => {

    const initialState = {
        username : "",
        password : "",
    };

    const [field, setField] = useState(initialState);

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp] : val, 
        })
    }

    const login = (e) => {
        e.preventDefault();
        console.log("Test : " , e.target)

    }


    return (
        <body>
            <div id="pageMain">
                <div>
                    LOGIN
                </div>
                <div>
                    <form onSubmit={login} id="signupBox"> 
                        <input type="text" placeholder="Username"  onChange={(e) => changeValue('username', e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => changeValue('password', e.target.value)}/>
                        <button type="submit">LOG IN</button>
                    </form>
                </div>
            </div>
        </body>


    )

}

export default LoginPage;