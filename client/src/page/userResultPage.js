import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";
import { Redirect } from "react-router-dom";

const UserResult = (props) => {

    const [styleState, setStyleState] = useState("center_hidden");
    const [overlay, setOverlay] = useState("overlay-none");
    const [payText, setPayText] = useState("Pay");
    const [payStatus, setPayStatus] = useState(false);
    const [result_, setResult_] = useState(props.result);
    const EthCrypto = require('eth-crypto');


    const decryptRecord = async (temp) =>{
        let decomposed = EthCrypto.cipher.parse(temp);
        let temp_ = await EthCrypto.decryptWithPrivateKey(localStorage.getItem("private_key"), decomposed);
        setResult_(temp_);
    }

    const decryptIf = (raw_item) =>{
        console.log("IN DECRYPT, " + raw_item);
        if(props.paidStat){
            var r = decryptRecord(raw_item)
        }
    }

    useEffect( ()=>{
        decryptIf();
    }, [])


    const openPayment = (e) => {
        e.preventDefault();
        setStyleState("center_popup_special");
        setOverlay("overlay");
    }

    const closePayment = (e) => {
        e.preventDefault();
        setStyleState("center_hidden");
        setOverlay("overlay-none");
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

                props.contract.methods.updatePendingHealthRecord(props.account, true, count_).send({ from: props.account , gas:3000000}).then(function (result) {
                    window.location.reload();
                });

            }).on('error', console.error);

        }



    }

    

    return (
        <div className="auth-inner">
            <form>
                <button id="back-button">
                    <Link className="nav-link" to={"/user-landing-page"} style={{ color: "black" }} >Back</Link>
                </button>
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
                    {props.paidStat?decryptIf(props.result):"" }
                    <div className="right-half-container">
                        <div className="form-group standard-height">
                            <label>{props.provLocation}</label>
                        </div>
                        <div className="form-group standard-height">
                            <label>{props.date}</label>
                        </div>
                        <div className="form-group standard-height">
                            <label>{props.name}</label>
                        </div>
                        <div className="form-group standard-height">
                            <label>{props.hkid}</label>
                        </div>
                        <div className="form-group standard-height">
                            <label>{props.paidStat ? result_ : "****"}</label>
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

                <div id={overlay}>
                    <div className={styleState}>
                        <button onClick={closePayment} className="modalCloseButton_special">X</button>
                        <div className="auth-inner">

                            <form>
                                <h3 className="title">User Payment</h3>

                                <div className="split-container">
                                    <div className="left-half-container">
                                        <div className="form-group standard-height">
                                            <label>Provider Name: </label>
                                        </div>
                                        <div className="form-group long-label">
                                            <label>Provider Ethereum Address: </label>
                                        </div>
                                        <div className="form-group standard-height">
                                            <label>Provider Location: </label>
                                        </div>
                                        <div className="form-group standard-height">
                                            <label>Ether Payable: </label>
                                        </div>
                                    </div>
                                    <div className="right-half-container">
                                        <div className="form-group standard-height">
                                            <label>{props.provName}</label>
                                        </div>
                                        <div className="form-group long-label">
                                            <label>{props.payableTo}</label>
                                        </div>
                                        <div className="form-group standard-height">
                                            <label>{props.provLocation}</label>
                                        </div>
                                        <div className="form-group standard-height">
                                            <label>{props.amount}</label>
                                        </div>
                                    </div>

                                </div>

                                <button type="submit" className="btn btn-primary btn-block result-btn" onClick={makePayment}>{payText}</button>

                            </form>

                        </div>
                    </div>
                </div>
            }
        </div>
    );


}

const UserResultPage = (props) => {
    const logged = localStorage.getItem("logged");
    var backToLoginPage = false;
    const [setupStatus, setSetupStatus] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(localStorage.getItem("eth_address"));
    const [resultArray, setResultArray] = useState("");
    const [provInfo, setProvInfo] = useState("");
    const [noResult, setNoResult] = useState(true);



    const logOut = () => {
        localStorage.clear();
    }

    const onUnauthorised = () => {
        backToLoginPage = true;
    }

    const setup = async () => {
        const web3_ = await getWeb3();
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        contract_.methods.getPendingHealthRecordLength(account).call({ from: account }, (err, result) => {
            if (result > 0) {
                setNoResult(false);

                contract_.methods.getPendingHealthRecord(result - 1, account).call({ from: account }, (err2, result2) => {
                    let temp = result2;
                    console.log(temp);
                    contract_.methods.getProviderInfo(temp["6"]).call({ from: account }, (err3, result3) => {
                        setProvInfo(result3);
                        setResultArray(temp);

                    });

                })
            } else {
                setProvInfo("");
                setResultArray("");
            }

        });


        // let temp = await contract_.methods.getPendingHealthRecord(length_, account).call({ from: account });
        // let provInfo_ = await contract_.methods.getProviderInfo(temp["6"]).call({ from: account });
        //let temp =   { "0": "pos", "1": "01-02-21", "2": "Queen mary", "3": "Tsim sha tsui", "4": "1", "5": false, "6": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c" };
        //let provInfo_ = { "0": "Queen mary", "1": "HKU" };;
        setSetupStatus(true);
    }


    useEffect(() => {
        if (logged) {
            setup();
        }


    },[]);

    console.log(resultArray["0"])


    return (
        <>
            {logged ?
                <>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                        <div className="container">

                            <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto">

                                    <li className="nav-item">

                                        <Link className="nav-link" to={"/sign-in"} onClick={() => logOut()}>Log Out</Link>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </nav>
               
            

            <div className="auth-wrapper">
                {noResult ? 
                    <div className="auth-inner" style={{textAlign:"center"}}>
                        No result available.
                    </div>
                :   
                    <UserResult paidStat={resultArray["5"]} date={resultArray["1"]} amount={resultArray["4"]} provName={provInfo["0"]}
                        payableTo={resultArray["6"]} provLocation={provInfo["1"]}
                        name={localStorage.getItem("name")} hkid={localStorage.getItem("hkid")}
                        web3={web3} account={account} contract={contract}
                        result={resultArray["0"]}
                    ></UserResult>
                }
            </div>
                </> : onUnauthorised()}
            {backToLoginPage ? <Redirect to={"/sign-in"} /> : ""}
        </>
    );


}

export default UserResultPage;