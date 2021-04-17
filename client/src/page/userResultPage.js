import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";

const UserResult = (props) => {

    const [styleState, setStyleState] = useState("center_hidden");
    const [payText, setPayText] = useState("Pay");
    const [payStatus, setPayStatus] = useState(false);

    const openPayment = (e) => {
        e.preventDefault();
        setStyleState("center_popup");
    }

    const closePayment = (e) => {
        e.preventDefault();
        setStyleState("center_hidden");
    }

    const makePayment = async (count_) => (e) => {
        console.log("Count = " + count_);
        e.preventDefault();
        if (!payStatus) {
            setPayStatus(true);
            setPayText("Paying.. Do not refresh");
            props.web3.eth.sendTransaction({
                from: props.account,
                to: props.payableTo,
                value: props.web3.utils.toWei(props.amount, 'ether'),
            }).on('confirmation', function (confirmationNumber, receipt) {
                setPayText("Paid");

                props.contract.methods.updatePendingHealthRecord(props.account, true, count_).call({ from: props.account }).then(function (result) {
                    window.location.reload();
                });

            }).on('error', console.error);

        }



    }

    return (
        <div className="auth-inner">
            <form>
                <h3 className="title">User Result</h3>

                <div className="split-container">
                    <div className="left-half-container">
                        <div className="form-group">
                            <label>Venue: </label>
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                        </div>
                        <div className="form-group">
                            <label>Name: </label>
                        </div>
                        <div className="form-group">
                            <label>HKID: </label>
                        </div>
                        <div className="form-group">
                            <label>Result: </label>
                        </div>
                    </div>
                    <div className="right-half-container">
                        <div className="form-group">
                            <label>{props.provLocation}</label>
                        </div>
                        <div className="form-group">
                            <label>{props.date}</label>
                        </div>
                        <div className="form-group">
                            <label>{props.name}</label>
                        </div>
                        <div className="form-group">
                            <label>{props.hkid}</label>
                        </div>
                        <div className="form-group">
                            <label>{props.paidStat ? props.result : "****"}</label>
                        </div>
                    </div>

                </div>

                {props.paidStat ? "" :


                    <button type="submit" className="btn btn-primary btn-block result-btn" onClick={openPayment}>
                        Pay to View
                </button>
                }

            </form>

            {props.paidStat ? "" :


                <div className={styleState}>
                    <button onClick={closePayment}>X</button>
                    <div className="auth-inner">

                        <form>
                            <h3 className="title">User Payment</h3>

                            <div className="split-container">
                                <div className="left-half-container">
                                    <div className="form-group">
                                        <label>Provider Name: </label>
                                    </div>
                                    <div className="form-group long-label">
                                        <label>Provider Ethereum Address: </label>
                                    </div>
                                    <div className="form-group">
                                        <label>Provider Location: </label>
                                    </div>
                                    <div className="form-group">
                                        <label>Ether Payable: </label>
                                    </div>
                                </div>
                                <div className="right-half-container">
                                    <div className="form-group">
                                        <label>{props.provName}</label>
                                    </div>
                                    <div className="form-group long-label">
                                        <label>{props.payableTo}</label>
                                    </div>
                                    <div className="form-group">
                                        <label>{props.provLocation}</label>
                                    </div>
                                    <div className="form-group">
                                        <label>{props.amount}</label>
                                    </div>
                                </div>

                            </div>

                            <button type="submit" className="btn btn-primary btn-block result-btn" onClick={makePayment}>{payText}</button>

                        </form>

                    </div>
                </div>
            }
        </div>
    );


}

const UserResultPage = (props) => {

    const [setupStatus, setSetupStatus] = useState(false);
    const [web3 , setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(localStorage.getItem("eth_address"));
    const [resultArray, setResultArray] = useState("");
    const [provInfo, setProvInfo] = useState("");


    const setup = async () => {
        const web3_ = await getWeb3();
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        let length_ = await contract_.methods.getPendingHealthRecordLength(account).call({from: account});
        let temp = await contract_.methods.getPendingHealthRecord(length_, account).call({ from: account });
        let provInfo_ = await contract_.methods.getProviderInfo(temp["6"]).call({ from: account });
        //let temp =   { "0": "pos", "1": "01-02-21", "2": "Queen mary", "3": "Tsim sha tsui", "4": "1", "5": false, "6": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c" };
        //let provInfo_ = { "0": "Queen mary", "1": "HKU" };;
        setProvInfo(provInfo_);
        setResultArray(temp);
        setSetupStatus(true);
    }


    useEffect(() => {

        setup();


    }, [resultArray, setupStatus]);



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
                <UserResult paidStat={resultArray["5"]} date={resultArray["1"]} amount={resultArray["4"]} provName={provInfo["0"]}
                    payableTo={resultArray["6"]} provLocation={provInfo["1"]}
                    name={localStorage.getItem("name")} hkid={localStorage.getItem("hkid")}
                    web3={web3} account={account} contract={contract}
                ></UserResult>
                
            </div>
        </>
    );


}

export default UserResultPage;