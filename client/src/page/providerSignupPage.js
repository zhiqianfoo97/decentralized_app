import React, { useState }  from "react";
import './page.css';

const ProSignUpPage = () => {
    const initialState = {
        username : "",
        name: "",
        password : "",
        hpn : "",
        email : "",
        add : "",
        ethAdd: "",
    };

    const [field, setField] = useState(initialState);

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp] : val, 
        })
    }


    //need to improve this
    const signUp = (e) => {
        e.preventDefault();
        console.log("Test : " , e.target)

    }

    // onChange = { (e) => setField({...field, temp : val})}
    return (
        <body>
            <div id="pageMain">
                <div>
                    NEW SUPPLIER
                </div>
                <div>
                    <form onSubmit={signUp} id="signupBox"> 
                        <input type="text" placeholder="Username"  onChange={(e) => changeValue('username', e.target.value)}/>
                        <input type="text" placeholder="Name"  onChange={(e) => changeValue('name', e.target.value)}/>
                        <input type="text" placeholder="Address"  onChange={(e) => changeValue('add', e.target.value)}/>
                        <input type="text"  placeholder="Healthcare Provider Number" onChange={(e) => changeValue('hpn', e.target.value)}/>
                        <input type="text"  placeholder="Ethereum address" onChange={(e) => changeValue('ethAdd', e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => changeValue('password', e.target.value)}/>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </body>

        


    )
}

export default ProSignUpPage;