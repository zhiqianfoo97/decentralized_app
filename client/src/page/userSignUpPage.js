import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";
import EthCrypto from 'eth-crypto';
import { createPortal } from "react-dom";

const UserSignUpPage = () => {
    const initialState = {
        username: "",
        password: "",
        hkid: "",
        name: "",
        eth_address: "",
        public_key: ""
    };


    const [field, setField] = useState(initialState);

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp]: val,
        })
    }


    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [setupStatus, setSetupStatus] = useState(false);

    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        setContract(contract_);
        setSetupStatus(true);
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
        var ethAdd = field.ethAdd;
        var hkid = field.hkid;
        var password = field.password;
        var name = field.name;
        var public_key = field.public_key;

        var ipfsHash = "";
        console.log("creating user on ipfs for", username);
        var userJsonAuthentication = {
            username: username,
            password: password
        };

        var userJsonInfo = {
            ethAdd: ethAdd,
            hkid: hkid,
            name: name,
            public_key: public_key
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


        // node
        const EthCrypto = require('eth-crypto');

        ipfs.add([Buffer.from(JSON.stringify(userJsonAuthentication))], async function (err, res) {
            if (err) throw err
            ipfsHash = res[0].hash
            console.log(ipfsHash);
            if (ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user authentication from', url);

            }
            const identity = EthCrypto.createIdentity();
            /* > {
                address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
                privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
                publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06ece...'
            } */
            var json = {}
            var encrypted = await EthCrypto.encryptWithPublicKey(
                identity.publicKey, // publicKey
                ipfsHash // message
            ).then((value) => {
                json = value
                console.log(json);
            })

            const to_string = EthCrypto.cipher.stringify(json);
            const back_to_json = EthCrypto.cipher.parse(to_string);

            var message = await EthCrypto.decryptWithPrivateKey(
                identity.privateKey, // privateKey
                back_to_json
                
            ).then((message) =>{
                console.log(message);
            })
           


        });


        ipfs.add([Buffer.from(JSON.stringify(userJsonInfo))], async function (err, res) {
            if (err) throw err
            ipfsHash = res[0].hash
            console.log(ipfsHash);
            if (ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user info from', url);

            }    
            const identity = EthCrypto.createIdentity();
            /* > {
                address: '0x3f243FdacE01Cfd9719f7359c94BA11361f32471',
                privateKey: '0x107be946709e41b7895eea9f2dacf998a0a9124acbb786f0fd1a826101581a07',
                publicKey: 'bf1cc3154424dc22191941d9f4f50b063a2b663a2337e5548abea633c1d06ece...'
            } */
            var json = {}
            var encrypted = await EthCrypto.encryptWithPublicKey(
                identity.publicKey, // publicKey
                ipfsHash // message
            ).then((value) => {
                json = value
                console.log(json);
            })

            const to_string = EthCrypto.cipher.stringify(json);
            const back_to_json = EthCrypto.cipher.parse(to_string);

            var message = await EthCrypto.decryptWithPrivateKey(
                identity.privateKey, // privateKey
                back_to_json
                
            ).then((message) =>{
                console.log(message);
            })
           


        });
        
        
        }
    
    const registerToEthereum = () =>{

        contract.methods.registerUser(field.eth_address).call({from: field.eth_address}, function(error, result){
            console.log("hehe");

        })


    }
        
    useEffect(()=>{
        setup()
    }, [])







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
                            <input type="text" value={field.username} className="form-control" placeholder="Enter username" onChange={(e) => changeValue('username', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={field.name} className="form-control" placeholder="Enter name as per HKID" onChange={(e) => changeValue('name', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Ethereum Address</label>
                            <input type="text" value={field.eth_address} className="form-control" placeholder="Enter ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>HKID / Passport Number</label>
                            <input type="text" value={field.hkid} className="form-control" placeholder="Enter hkid or passport no." onChange={(e) => changeValue('hkid', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={field.password} className="form-control" placeholder="Enter password" onChange={(e) => changeValue('password', e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Public Key</label>
                            <input type="text" value={field.public_key} className="form-control" placeholder="Enter public key" onChange={(e) => changeValue('public_key', e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={createUser}>Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered? <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );


}



export default UserSignUpPage;