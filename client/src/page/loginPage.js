import React, { useState }  from "react";

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


    // return (
    //     <body>
    //         <div id="pageMain">
    //             <div>
    //                 LOGIN
    //             </div>
    //             <div>
    //                 <form onSubmit={login} id="signupBox"> 
    //                     <input type="text" placeholder="Username"  onChange={(e) => changeValue('username', e.target.value)}/>
    //                     <input type="password" placeholder="Password" onChange={(e) => changeValue('password', e.target.value)}/>
    //                     <button type="submit">LOG IN</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </body>


    // )
    return (
        <div className="auth-inner">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </div>
    );

}

export default LoginPage;