import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";


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
    };

    const [field, setField] = useState(initialState);
    const [pvKey, setpvKey] = useState("");
    const [setupStatus, setSetupStatus] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [userPassHash, setUserPassHash] = useState("");
    const [provPubKey, setProvPubKey] = useState("");


    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp]: val,
        })
    }


    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);

        setContract(contract_);
        setSetupStatus(true);
    }

    useEffect(() => {
        setup();
    }, [setupStatus])

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

    async function createUser(e) {
        e.preventDefault();
        var username = field.username;
        var name = field.name;
        var address = field.address;
        var healthcare_provider_number = field.healthcare_provider_number;
        var password = field.password;
        var ipfsHash = "";
        const EthCrypto = require('eth-crypto');
        const public_key = EthCrypto.publicKeyByPrivateKey(pvKey);
        setProvPubKey(public_key);

        console.log("creating user on ipfs for", username);
        var userJsonAuthentication = {
            username: username,
            password: password
        };

        var userJsonInfo = {
            public_key: public_key
        }


        console.log("sending info");


        ipfs.add([Buffer.from(JSON.stringify(userJsonAuthentication))], async function (err, res) {
            if (err) throw err
            ipfsHash = (res[0].hash);

            if (ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user authentication from', url);

            }

            var encrypted = await EthCrypto.encryptWithPublicKey(
                public_key, // publicKey
                ipfsHash // message
            );

            setUserPassHash(EthCrypto.cipher.stringify(encrypted));
            setOpenAdminMenu(true);
        });

    }

    const [openAdminMenu, setOpenAdminMenu] = useState(false);

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

            {openAdminMenu ?
                <div className="center_popup">
                    <div>
                        <label>Provider's public key</label>
                        <div>{provPubKey}</div>
                    </div>

                    <div>
                        <label>Provider's encrypted login info</label>
                        <div>{userPassHash}</div>
                    </div>
                </div>

                : ""}

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>New Provider</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={field.username} placeholder="Enter name" onChange={(e) => changeValue('username', e.target.value)} />
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

                        <div className="form-group">
                            <label>Private key</label>
                            <input type="password" className="form-control" value={pvKey} placeholder="Enter password" onChange={(e) => setpvKey(e.target.value)} />
                            <p className="forgot-password">Private key is only used to generate public key for encryption purposes and is never sent over network.</p>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={createUser} >Sign Up</button>
                        <p className="forgot-password text-right">
                            Registration will be subjected to manual review.
                        </p>
                    </form>
                </div>
            </div>
            
        </>
    );

}



export default SupplierSignUpPage;