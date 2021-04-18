import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import emailjs from "emailjs-com";

const SupplierSignUpPage = () => {
    const initialState = {
        username: "",
        name: "",
        address: "",
        healthcare_provider_number: "",
        password: "",
        email: "",
        eth_address: "",
        location: "",
        recipientEmail: 'email@example.com'
    };

    const [field, setField] = useState(initialState);

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp]: val,
        })
    }


    // //need to improve this
    // const signUp = (e) => {
    //     e.preventDefault();
    //     console.log("Test : " , e.target)

    // }

    const handleSubmit = () => {
        const templateId = 'template_id';

        sendFeedback(templateId, { message_html: field, from_name: field.name, reply_to: field.recipientEmail })
        alert("Application Submitted! Please wait for the approval from admin.")
    }

    const sendFeedback = (templateId, variables) => {
        emailjs.send(
            'gmail', templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
        .catch(err => console.log(""))
    }

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

    function createUser(e) {
        e.preventDefault();
        var username = field.username;
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

        ipfs.add([Buffer.from(JSON.stringify(userJsonAuthentication))], function (err, res) {
            if (err) throw err
            ipfsHash = res[0].hash
            console.log(ipfsHash);
            if (ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user authentication from', url);

            }
        });


        ipfs.add([Buffer.from(JSON.stringify(userJsonInfo))], function (err, res) {
            if (err) throw err
            ipfsHash = res[0].hash
            console.log(ipfsHash);
            if (ipfsHash != 'not-available') {
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
                            <label>Username</label>
                            <input type="text" className="form-control" value={field.username} placeholder="Enter username" onChange={(e) => changeValue('username', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={field.name} placeholder="Enter name" onChange={(e) => changeValue('name', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Ethereum Address </label>
                            <input type="text" className="form-control" value={field.eth_address} placeholder="Enter Ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Healthcare Provider Number</label>
                            <input type="text" className="form-control" value={field.healthcare_provider_number} placeholder="Enter healthcare provider no." onChange={(e) => changeValue('healthcare_provider_number', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" value={field.email} placeholder="Enter email" onChange={(e) => changeValue('email', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" className="form-control" value={field.location} placeholder="Enter location" onChange={(e) => changeValue('location', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={field.password} placeholder="Enter password" onChange={(e) => changeValue('password', e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Sign Up</button>
                        <p className="forgot-password text-right">
                            {/* Already registered? <Link className="nav-link" to={"/sign-in"}>Sign in</Link> */}
                            Registration will be subjected to manual review.
                        </p>
                    </form>
                </div>
            </div>
        </>
    );

}



export default SupplierSignUpPage;