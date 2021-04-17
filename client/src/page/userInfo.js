import React, { useState, useEffect } from "react";
import { QRCode } from 'react-qr-svg';
import getWeb3 from "../getWeb3";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const UserInfo = (props) => {

    const [balance, setBalance] = useState(0);
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);

    const setup = async () => {
        let balance_temp = 0;
        try {

            const web3_ = await getWeb3();
            setWeb3(web3_);
            let temp = localStorage.getItem("eth_address");
            setAccount(temp);

            if (account !== null) {
                balance_temp = await web3.eth.getBalance(account);
                setBalance(web3.utils.fromWei(balance_temp));
            }

        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        setup();

    }, [account, balance])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">

                    <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">

                                <Link className="nav-link" to={"/sign-in"}>Log Out</Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <button id="back-button">
                            <Link className="nav-link" to={"/user-landing-page"} style={{ color: "black" }} >Back</Link>
                        </button>
                        <h3 className="title">User Information</h3>

                        <div className="split-container">
                            <div className="left-half-container">
                                <div className="form-group">
                                    <label>Username: </label>
                                </div>
                                <div className="form-group">
                                    <label>Name: </label>
                                </div>
                                <div className="form-group">
                                    <label>HKID: </label>
                                </div>
                                <div className="form-group">
                                    <label>Ethereum Address: </label>
                                </div>
                                <div className="form-group">
                                    <label>Ether Balance: </label>
                                </div>
                            </div>
                            <div className="right-half-container">
                                <div className="form-group">
                                    <label>{localStorage.getItem("username")}</label>
                                </div>

                                <div className="form-group">
                                    <label>{localStorage.getItem("name")}</label>
                                </div>
                                <div className="form-group">
                                    <label>{localStorage.getItem("hkid")}</label>
                                </div>
                                <div className="form-group">
                                    <label>{account}</label>
                                </div>
                                <div className="form-group">
                                    <label>{balance}</label>
                                </div>
                            </div>

                        </div>


                        <div className="form-group">
                            <div className="qrCode">
                                <QRCode
                                    level="Q"

                                    value={JSON.stringify({
                                        name: localStorage.getItem("name"),
                                        hkid: localStorage.getItem("hkid"),
                                        eth_address: account,
                                    })}
                                />
                            </div>
                        </div>



                    </form>
                </div>
            </div>
        </>
    );

}

export default UserInfo;