import React, { useState }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const UserSignUpPage = () => {
    const initialState = {
        username : " ",
        password : " ",
        hkid : " ",
        ethAdd : " ",
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
        var username = field.username;
        var ethAdd = field.ethAdd;
        var hkid = field.hkid;
        var password = field.password;
        var ipfsHash = "";
        console.log("creating user on ipfs for", username);
        var userJson = {
            username: username,
            // ethAdd: ethAdd,
            // hkid: hkid,
            password: password
        };
        ipfs.files.stat('/').then(res =>res.text());
        console.log(ipfs.files.stat('/'));

        // var FileSaver = require('file-saver');
        // var blob = new Blob([username + ":" + password], {type: "text/plain;charset=utf-8"});
        // FileSaver.saveAs(blob, "authentication.txt");
        // ipfs.files.mkdir('/example')
        // ipfs.files.stat('/example')
        
    //     var EMPTY_DIR=ipfs.object new unixfs-dir);
    // //   $ BAR=$(echo "bar" | ipfs add -q)
    // //   $ ipfs object patch $EMPTY_DIR add-link foo $BAR

        
        ipfs.add([Buffer.from(JSON.stringify(userJson))], function(err, res) {
            if (err) throw err
            ipfsHash = res[0].hash
            console.log(ipfsHash);
            console.log("creating user on eth for", username, ethAdd, hkid, password);
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
                <h3>New User</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username"  onChange={(e) => changeValue('username', e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Ethereum Address</label>
                    <input type="text" className="form-control" placeholder="Enter ethereum address" onChange={(e) => changeValue('ethAdd', e.target.value)} />
                </div>

                <div className="form-group">
                    <label>HKID / Passport Number</label>
                    <input type="text" className="form-control" placeholder="Enter hkid or passport no."  onChange={(e) => changeValue('hkid', e.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"  onChange={(e) => changeValue('password', e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick = {createUser}>Sign Up</button>
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



export default UserSignUpPage;