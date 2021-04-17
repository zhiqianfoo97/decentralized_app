import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const SupplierSignUpPage = () => {
    const initialState = {
        name : "",
        address : "",
        healthcare_provider_number : "",
        password : "",
    };

    const [field, setField] = useState(initialState);

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp] : val, 
        })
    }


    // //need to improve this
    // const signUp = (e) => {
    //     e.preventDefault();
    //     console.log("Test : " , e.target)

    // }

    const ipfsAPI = require('ipfs-api');
    // // const ipfs = ipfsAPI('localhost', '5001');
    const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    // ipfs.id(function(err, res) {
    //     if (err) throw err
    //     console.log("Connected to IPFS node!", res.id, res.agentVersion, res.protocolVersion);
    // });

    // const run = async (files) => {
    //     // This code adds your uploaded files to your root directory in IPFS
    //     await Promise.all(files.map(f => ipfs.files.write('/' + f.name, f, { create: true })))
      
    //     // Add your code to create a new directory here
    //     await ipfs.files.mkdir('/userInfo', { parents: true })
      
    //     let rootDirectoryContents = await all(ipfs.files.ls('/'))
    //     return rootDirectoryContents
    // }

    function createUser (e) {
       e.preventDefault();
        var name = field.name;
        var address = field.address;
        var healthcare_provider_number = field.healthcare_provider_number;
        var password = field.password;
        var ipfsHash = "";
        console.log("creating user on ipfs for", username);
        var userJsonAuthentication = {
            name: name,
            password: password
        };

        var userJsonInfo = {
            address: address,
            healthcare_provider_number: healthcare_provider_number,
        }
        
        
        console.log("sending info");
        // const options = {
        //     mode: 'no-cors',
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(userJson)
        // }

        

        // const response = await fetch('http://localhost:3001/api', options);
        // const data = await response.text();
        
        // fetch('http://localhost:3001/api',{
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userJson)
        // }).then(response => {
        //         console.log(response)
        //     })
        // .catch(error =>{
        //         console.log(error)
        // })

        // console.log(JSON.stringify(userJson));
        
        ipfs.add([Buffer.from(JSON.stringify(userJsonAuthentication))], function(err, res) {
            if (err) throw err
            ipfsHash = res[0].hash
            console.log(ipfsHash);
            if(ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user authentication from', url);

            }
        });


        ipfs.add([Buffer.from(JSON.stringify(userJsonInfo))], function(err, res) {
            if (err) throw err
            ipfsHash = res[0].hash
            console.log(ipfsHash);
            if(ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user info from', url);

            }
        });
        
        
        }

        



    
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">

            <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                
                    <li className="nav-item">

                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                    </li>
                    
                </ul>

            </div>
            </div>
        </nav>

      <div className="auth-wrapper">
        <div className="auth-inner"> 
            <form>
                <h3>New Supplier</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" />
                </div>

                <div className="form-group">
                    <label>Address </label>
                    <input type="text" className="form-control" placeholder="Enter address" />
                </div>

                <div className="form-group">
                    <label>Healthcare Provider Number</label>
                    <input type="text" className="form-control" placeholder="Enter healthcare provider no." />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </p>
            </form>
        </div>
        </div>
        </>
    );



    // onChange = { (e) => setField({...field, temp : val})}
    // return (
    //     <body>
    //         <div id="pageMain">
    //             <div>
    //                 NEW USER
    //             </div>
    //             <div>
    //                 <form onSubmit={signUp} id="signupBox"> 
    //                     <input type="text" placeholder="Username"  onChange={(e) => changeValue('username', e.target.value)}/>
    //                     <input type="text" placeholder="Ethereum address"  onChange={(e) => changeValue('ethAdd', e.target.value)}/>
    //                     <input type="text"  placeholder="HKID / Passport number" onChange={(e) => changeValue('hkid', e.target.value)}/>
    //                     <input type="text"  placeholder="Email address" onChange={(e) => changeValue('email', e.target.value)}/>
    //                     <input type="password" placeholder="Password" onChange={(e) => changeValue('password', e.target.value)}/>
    //                     <button type="submit">Sign Up</button>
    //                 </form>
    //             </div>
    //         </div>
    //     </body>

        


    // )
}



export default SupplierSignUpPage;