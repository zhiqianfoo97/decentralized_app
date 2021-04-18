import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";
const EthCrypto = require('eth-crypto');

export default class LoginPage extends React.Component {

    state = {
        userRedirect: false,
        supplierRedirect: false,
        showUser: false,
        showProvider: false,
        showAll: true,
        username: '',
        password: '',
        pvKey: '',
        web3: '',
        contract: '',
        pbKey: '',
        user_add: ''
    }

    componentDidMount = async () => {
        let web3_ = await getWeb3();
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        this.setState({ web3: web3_, contract: contract_ });
    }

    setAuthenticationMessage = () => {
        this.setState({
            authenticationMessage: "Incorrect username or password!"
        })
    }

    setUserRedirect = () => {
        this.setState({
            userRedirect: true,
        })
    }

    setSupplierRedirect = () => {
        this.setState({
            supplierRedirect: true,
        })
    }


    renderUserRedirect = () => {
        if (this.state.userRedirect) {
            return <Redirect to={"/user-landing-page"} />
        }
    }

    renderSupplierRedirect = () => {
        if (this.state.supplierRedirect) {
            return <Redirect to={"/provider-landing-page"} />
        }
    }


    MakeQuerablePromise = (promise) => {
        // Don't modify any promise that has been already modified.
        if (promise.isResolved) return promise;

        // Set initial state
        var isPending = true;
        var isRejected = false;
        var isFulfilled = false;

        // Observe the promise, saving the fulfillment in a closure scope.
        var result = promise.then(
            function (v) {
                isFulfilled = true;
                isPending = false;
                return v;
            },
            function (e) {
                isRejected = true;
                isPending = false;
                throw e;
            }
        );

        result.isFulfilled = function () { return isFulfilled; };
        result.isPending = function () { return isPending; };
        result.isRejected = function () { return isRejected; };
        return result;
    }



    loginUser = async (e) => {
        e.preventDefault();

        var userJson = {
            username: this.state.username,
            password: this.state.password
        };

        var infoJson = {
            pvKey: this.state.pvKey

        };

        var contract_ = this.state.contract;

        var ipfsHash = "";
        const ipfsAPI = require('ipfs-api');
        const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        var that = this;
        var pbKey_ = "";
        const pK = EthCrypto.publicKeyByPrivateKey(infoJson.pvKey);
  
        const address_ = EthCrypto.publicKey.toAddress(pK);
        var result_holder = "";





        contract_.methods.getUserEncrypted(address_).call({ from: address_ }, async function (error, result) {
            //0 = login, 1 = personal
            result_holder = result;
            console.log("RESULT? = " + result["0"]);
            console.log("REUSLT2 ? = " + result["1"]);
            var ipfsHash = await EthCrypto.decryptWithPrivateKey(
                infoJson.pvKey,
                result_holder["0"]
            );


            let url = 'https://ipfs.io/ipfs/' + ipfsHash;
            const authentication = fetch(url).then(response => response.json());
            var myPromise = that.MakeQuerablePromise(authentication);

            setTimeout(() => {
                if (myPromise.isPending()) {
                    console.log("wrong authentication info")
                } else {
                    console.log("IN one");

                    myPromise.then(async function (data) {
                        console.log("data username = " + data.username); // "Yeah !"
                        console.log("data password = " + data.password);
                        console.log("RESUET 2 = " + result_holder["1"]);

                        console.log("PVKEY = " + infoJson.pvKey);
                        console.log("encrypted hash " + result_holder["1"]);



                        if ((data.username === userJson.username) && (data.password === userJson.password)) {
                            console.log("IN two");
                            // contract_.methods.getLoginInfo(encryptedString).call({ from: user_add_ }, async function (error, result) {
                            var jsonInfo_ = await EthCrypto.decryptWithPrivateKey(infoJson.pvKey, result_holder["1"]);
                            // await EthCrypto.decryptWithPrivateKey(infoJson.pvKey, result_holder["1"]).then((jsonInfo_) => {
                            console.log("JSON INFO =" + jsonInfo_);
                            let url2 = 'https://ipfs.io/ipfs/' + jsonInfo_;
                            const authentication2 = fetch(url2).then(response => response.json());
                            var myPromise2 = that.MakeQuerablePromise(authentication2);

                            setTimeout(() => {
                                if (myPromise2.isPending()) {
                                    console.log("wrong info");
                                } else {
                                    console.log("IN three");
                                    myPromise2.then(function (data) {
                                        console.log("HKID = " + data.hkid);
                                        console.log("name = " + data.name);
                                        localStorage.setItem("user_type", "user");
                                        localStorage.setItem("name", data.name);
                                        localStorage.setItem("username", userJson.username);
                                        localStorage.setItem("eth_address", address_);
                                        localStorage.setItem("logged", true);
                                        localStorage.setItem("hkid", data.hkid);
                                        localStorage.setItem("public_key", pbKey_);
                                        localStorage.setItem("private_key", infoJson.pvKey);

                                        console.log("success")

                                        that.setUserRedirect();

                                    })
                                }
                            }, 2000)
                            //})  

                        }

                    });

                }

            }, 2000);

        })


        // const authentication = fetch(url).then(response => response.json());
        // var myPromise = that.MakeQuerablePromise(authentication);


        // setTimeout(() => {
        //     if (myPromise.isPending()) {
        //         console.log("wrong authentication info")
        //         that.setAuthenticationMessage()

        //     } else {
        //         console.log("success")
        //         localStorage.setItem("logged", true);
        //         that.setUserRedirect();


        //     }

        // }, 2000);



    }







    loginProvider = (e) => {
        e.preventDefault();
        var userJson = {
            username: this.state.username,
            password: this.state.password
        };

        var infoJson = {
            pvKey: this.state.pvKey

        };

        var contract_ = this.state.contract;

        console.log("UserJSON USERNAME = " + userJson.username);
        console.log("UserJSON PASSWORD = " + userJson.password);
        console.log("PRIVATE KEY = " + infoJson.pvKey);
        var ipfsHash = "";
        const ipfsAPI = require('ipfs-api');
        const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        var that = this;
        var pbKey_ = "";
        const pK = EthCrypto.publicKeyByPrivateKey(infoJson.pvKey);
        console.log("PUBLIC KEY = " + pK);
        const address_ = EthCrypto.publicKey.toAddress(pK);
        var result_holder = "";
        console.log("ETH ADDRESS = " + address_);
        contract_.methods.getProviderEncryptedLogin(address_).call({ from: address_ }, async (error, result) => {

            if(error){
                alert(error);
            }
            result_holder = result;
            console.log("RESULT? = " + result);
            var ipfsHash = await EthCrypto.decryptWithPrivateKey(
                infoJson.pvKey,
                result_holder
            );
            let url = 'https://ipfs.io/ipfs/' + ipfsHash;
            const authentication = fetch(url).then(response => response.json());
            var myPromise = that.MakeQuerablePromise(authentication);
            setTimeout(() => {  
                if (myPromise.isPending()) {
                    console.log("wrong authentication info")
                } else {
                    console.log("IN one");

                    myPromise.then(async function (data) {
                        console.log("data username = " + data.username);
                        console.log("data password = " + data.password);


                        if ((data.username === userJson.username) && (data.password === userJson.password)) {
                            console.log("IN two");
                            contract_.methods.getProviderInfo(address_).call({ from: address_ }, async (err, result) => {

                                localStorage.setItem("user_type", "provider");
                                localStorage.setItem("username", userJson.username);
                                localStorage.setItem("name", result["0"]);
                                localStorage.setItem("eth_address", address_);
                                localStorage.setItem("location", result["1"])
                                localStorage.setItem("providerLogged", true);
                                localStorage.setItem("public_key", pK);
                                localStorage.setItem("private_key", infoJson.pvKey);
                                that.setSupplierRedirect();
                            })

                        } else {
                            alert("Incorrect input.");
                            window.location.reload();

                        }

                    });

                }

            }, 4000);

        })

    };



    openUser = (e) => {
        e.preventDefault();
        this.setState({
            showAll: false,
            showUser: true
        })

    }

    openProvider = (e) => {
        e.preventDefault();
        this.setState({
            showAll: false,
            showProvider: true
        })

    }

    closeAll = (e) => {
        e.preventDefault();
        this.setState({
            showUser: false,
            showProvider: false,
            showAll: true
        })
    }

    handleUserChanges = (e) => {
        e.preventDefault();
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChanges = (e) => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    handlePrivateKeyChange = (e) => {
        e.preventDefault();
        this.setState({
            pvKey: e.target.value
        })
    }


    render() {
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
                        {this.state.showAll ? "" : <button id="back-button" onClick={(e) => this.closeAll(e)}> Back </button>}
                        <form>
                            <h3>Sign In As</h3>


                            {this.state.showAll ?
                                <div >
                                    <button type="submit" className="btn custom-button btn-block loginButton" onClick={(e) => this.openUser(e)} >
                                        User
                        </button>

                                    <button type="submit" className="btn custom-button btn-block loginButton" onClick={(e) => this.openProvider(e)}>
                                        Provider
                        </button>

                                </div>
                                : ""}


                            {this.state.showUser ?

                                <div id="user-login">
                                    <h3>User</h3>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="username" className="form-control" placeholder="Enter username" value={this.state.username} onChange={(e) => this.handleUserChanges(e)} />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={(e) => this.handlePasswordChanges(e)} />
                                    </div>

                                    <div className="form-group">
                                        <label>Private Key</label>
                                        <input type="text" className="form-control" placeholder="Enter private key" value={this.state.pvKey} onChange={(e) => this.handlePrivateKeyChange(e)} />
                                        <p className="forgot-password">Private key is only for encryption purposes and is never sent over network.</p>
                                    </div>


                                    <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.loginUser(e)}>
                                        Submit
                                </button>

                                </div>

                                : ""}
                            {this.renderUserRedirect()}
                            {this.renderSupplierRedirect()}
                            {this.state.showProvider ?

                                <div id="provider-login">
                                    <h3>Provider</h3>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="username" className="form-control" placeholder="Enter username" value={this.state.username} onChange={(e) => this.handleUserChanges(e)} />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={(e) => this.handlePasswordChanges(e)} />
                                    </div>

                                    <div className="form-group">
                                        <label>Private Key</label>
                                        <input type="text" className="form-control" placeholder="Enter private key" value={this.state.pvKey} onChange={(e) => this.handlePrivateKeyChange(e)} />
                                        <p className="forgot-password">Private key is only for encryption purposes and is never sent over network.</p>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.loginProvider(e)}>
                                        Submit
                                </button>

                                </div>
                                : ""}

                        </form>
                    </div>
                </div>
            </>

        );
    }
}
