import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";

const AdminAddProvider = () => {
    const initialState = {
        username: "",
        name: "",
        address: "",
        password: "",
        eth_address: "",
        location: "",

    };

    const [showUser, setShowUser] = useState(false);
    const [showProvider, setShowProvider] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [field, setField] = useState(initialState);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [adminAddress, setAdminAddress] = useState("");

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp]: val,
        })
    }

    const changeAdmin = (e) => {
        e.preventDefault();
        setAdminAddress(e.target.value);
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

    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        setContract(contract_);

    }

    const toHospital = () => {
        contract.methods.registerHospital(field.eth_address, field.location, field.name).call({ from: { adminAddress } }, function (error, result) {
            if (error) {
                alert("Error.");
            }
            alert("Success!");
        });

    }

    const toKiosk = () => {
        contract.methods.registerKiosk(field.eth_address, field.location, field.name).call({ from: { adminAddress } }, function (error, result) {
            if (error) {
                alert("Error.");
            }
            alert("Success!");
        });



    }

    const openUser = (e) => {
        e.preventDefault();
        setShowAll(false);
        setShowUser(true);

    }

    const openProvider = (e) => {
        e.preventDefault();
        setShowAll(false);
        setShowProvider(true);

    }

    const closeAll = (e) => {
        e.preventDefault();
        setShowAll(true);
        setShowUser(false);
        setShowProvider(false);

    }

    useEffect(() => {
        setup();
    }, []);







    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    {showAll ? "" : <button id="back-button" onClick={closeAll}> Back </button>}
                    <form>
                        {showAll ? <h3>Register provider</h3> : ""}


                        {showAll ?
                            <div >
                                <button type="submit" className="btn custom-button btn-block loginButton" onClick={openUser} >
                                    Add Kiosk
                        </button>

                                <button type="submit" className="btn custom-button btn-block loginButton" onClick={openProvider}>
                                    Add Hospital
                        </button>
                                {/* <button className="login-page-button-unit" onClick={(e) => this.openUser(e)}>
                            User
                        </button>
                        <button className="login-page-button-unit" onClick={(e) => this.openProvider(e)}>
                            Test Provider
                        </button> */}


                            </div>
                            : ""}


                        {showUser ?

                            <div>


                                <h3>New Kiosk Provider</h3>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" value={field.username} placeholder="Enter name" onChange={(e) => changeValue('username', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={field.username} placeholder="Enter name" onChange={(e) => changeValue('name', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Ethereum Address </label>
                                    <input type="text" className="form-control" value={field.eth_address} placeholder="Enter Ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" value={field.location} placeholder="Enter location" onChange={(e) => changeValue('location', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={field.password} placeholder="Enter password" onChange={(e) => changeValue('password', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Admin address</label>
                                    <input type="text" className="form-control" value={adminAddress} onChange={changeAdmin} ></input>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" onClick={toKiosk} >Add</button>

                            </div>


                            : ""}

                        {showProvider ?

                            <div>


                                <h3>New Hospital Provider</h3>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" value={field.username} placeholder="Enter name" onChange={(e) => changeValue('username', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={field.username} placeholder="Enter name" onChange={(e) => changeValue('name', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Ethereum Address </label>
                                    <input type="text" className="form-control" value={field.eth_address} placeholder="Enter Ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" value={field.location} placeholder="Enter location" onChange={(e) => changeValue('location', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={field.password} placeholder="Enter password" onChange={(e) => changeValue('password', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Admin address</label>
                                    <input type="text" className="form-control" value={adminAddress} onChange={changeAdmin} ></input>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" onClick={toHospital} >Add</button>

                            </div>
                            : ""}

                    </form>
                </div>
            </div>

        </>
    );

}



export default AdminAddProvider;