import React, { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";


const UserResult = (props) => {

    const [styleState, setStyleState] = useState("center_hidden");
    const [overlay, setOverlay] = useState("overlay-none");
    const [payText, setPayText] = useState("Pay");
    const [payStatus, setPayStatus] = useState(false);
    

    const openPayment = (e) => {
        e.preventDefault();
        setStyleState("center_popup");
        setOverlay("overlay");

    }

    const closePayment = (e) => {
        e.preventDefault();
        setStyleState("center_hidden");
        setOverlay("overlay-none");

    }

    const makePayment = async (e) => {
        e.preventDefault();
        console.log("Count = " + props.count);
        if (!payStatus) {
            setPayStatus(true);
            setPayText("Paying.. Do not refresh");
            props.web3.eth.sendTransaction({
                from: props.account,
                to: props.payableTo,
                value: props.web3.utils.toWei(props.amount, 'ether'),
            }).on('confirmation', function (confirmationNumber, receipt) {
                setPayText("Paid");

                props.contract.methods.updatePendingHealthRecord(props.account, true, props.count).send({ from: props.account, gas:3000000 }, (err, result) => {
                    if(err){
                        alert(err);
                    }else{
                        alert("Success!");
                        window.location.reload();
                    }
                    


                })
                    
                ;

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

                <div id={overlay}>
                    <div className={styleState}>
                        <button onClick={closePayment} className="modalCloseButton">X</button>
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
                                        <div className="form-group" style={{ minHeight: '56px' }}>
                                            <label>{props.provName}</label>
                                        </div>
                                        <div className="form-group long-label" style={{ minHeight: '80px' }}>
                                            <label>{props.payableTo}</label>
                                        </div>
                                        <div className="form-group" style={{ minHeight: '56px' }}>
                                            <label>{props.provLocation}</label>
                                        </div>
                                        <div className="form-group" style={{ minHeight: '56px' }}>
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


const ResultRow = (props) => {
    const [styling, setStyling] = useState("center_hidden");
    const [overlay, setOverlay] = useState("overlay-none");
    const [result_, setResult_] = useState(props.result);

    const EthCrypto = require('eth-crypto');
    const openPopup = () => {
        setStyling("center_popup");
        setOverlay("overlay");

    }

    const closePopup = (e) => {
        e.preventDefault();
        setStyling("center_hidden");
        setOverlay("overlay-none");

    }

    const decryptRecord = async (temp) =>{
        let decomposed = EthCrypto.cipher.parse(temp);
        let temp_ = await EthCrypto.decryptWithPrivateKey(localStorage.getItem("private_key"), decomposed);
        setResult_(temp_);

    }

    const decryptIf = () =>{
        console.log("IN DECRYPT, " + result_);
        if(props.paidStat){
            decryptRecord(result_);
        }
    }

    useEffect( ()=>{
        decryptIf();
    }, [])

    return (

        <div className="column_container" >
            <div className="form-group border-bottom" onClick={openPopup} style={{ cursor: 'pointer' }}>
                <label>Venue: {props.provName} </label><br></br>
                <label>Address: {props.provLocation}</label><br></br>
                <label>Date: {props.date} </label> <br></br>
                <label>Result: {props.paidStat ? result_ : "****"}</label>
            </div>

            <div id={overlay}></div>
            <div className={styling}>
                <button onClick={closePopup} className="modalCloseButton"> X </button>
                <UserResult overlayStatus={props.overlayStatus} setOverlayStatus={props.setOverlayStatus} paidStat={props.paidStat} date={props.date} amount={props.amount} provName={props.provName}
                    payableTo={props.payableTo} provLocation={props.provLocation}
                    name={localStorage.getItem("name")} hkid={localStorage.getItem("hkid")}
                    web3={props.web3} account={props.account} count={props.count} contract={props.contract} result={result_}
                ></UserResult>
            </div>
        </div>

    )
}

const AppointmentRow = (props) => {
    return (
        <div className="column_container">
            <div className="form-group border-bottom" >
                <label>Venue: {props.placeName} </label><br></br>
                <label>Address: {props.location}</label><br></br>
                <label>Date: {props.date} </label>
            </div>
        </div>
    )
}

const UserHistory = (props) => {
    const logged = localStorage.getItem("logged");
    var backToLoginPage = false;
    const [pageLimit, setPageLimit] = useState(5);
    const [account, setAccount] = useState(localStorage.getItem("eth_address"));
    const [currentLimit, setCurrentLimit] = useState(0);
    const [appointmentLength, setAppointmentLength] = useState(0);
    const [resultLength, setResultLength] = useState(0);
    const [resultList, setResultList] = useState("");
    const [appointmentList, setAppointmentList] = useState("");
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [setupStatus, setSetupStatus] = useState(false);
    const [currentClicked, setCurrentClicked] = useState(true); //true = result, false = appointment

    const logOut = () => {
        localStorage.clear();
    }

    const onUnauthorised = () => {
        backToLoginPage = true;
    }

    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
       
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        let appointLength = 0;
        let resultLength_ = 0;

        contract_.methods.getUserAppointmentListLength(account).call({ from: account }, function (error, result) {
            setAppointmentLength(result);
        });

        contract_.methods.getPendingHealthRecordLength(account).call({ from: account }, function (error, result) {
            setResultLength(result);
        });


        setContract(contract_);
        //setAppointmentLength(appointLength);
        //setResultLength(resultLength_);
        setSetupStatus(true);
    }

    const setupResult =  (start) => {
        let temp_list = [];
        let temp = "";
        let provInfo = "";
        for (let i = start - 1; i >= start - pageLimit; i--) {
            if (i < 0) {
                break;
            }

            contract.methods.getPendingHealthRecord(i, account).call({ from: account }, (err, result) =>{
                if(err){
                    alert(err);
                }else{
                    temp = result;
                    contract.methods.getProviderInfo(result["6"]).call({ from: account }, (err2, result2)=>{
                        provInfo = result2;
                        console.log(temp["0"]);
                        if (temp !== "") {
                            temp_list.push(<ResultRow key={i} type={true} provName={provInfo["0"]}
                                provLocation={provInfo["1"]} account={account} result={temp["0"]} date={temp["1"]}
                                placeName={temp["2"]} location={temp["3"]} amount={temp["4"]} paidStat={temp["5"]} payableTo={temp["6"]} web3={web3}
                                count={i} contract={contract}></ResultRow>)
                        }

                        
                    });
              

                }
                


            });

        }

        setTimeout(() => {
            console.log(temp_list);
            setResultList(temp_list);
        }, 1500);
        


    }

    const setupAppointment = async (start) => {
        let temp_list = [];
        let temp = "";
        for (let i = start - 1; i >= start - pageLimit; i--) {
            if (i < 0) {
                break;
            }

            // try {
            //     temp = await contract.methods.getUserAppointmentList(i, account).call({ from: account });
            // } catch {
            //     console.log("Appointment does not exist");
            // }

            contract.methods.getUserAppointmentList(i, account).call({ from: account }, (err, result) =>{
                temp = result;
                if (temp !== "") {
                    temp_list.push(<AppointmentRow key={i}
                        type={false} account={account} placeName={temp["0"]} location={temp["1"]} date={temp["2"]}
                        count={i} ></AppointmentRow>)
                }
                setAppointmentList(temp_list);


            });


        }
  

    }


    const clickNext = (e) => {
        e.preventDefault();
        let count = currentLimit - 5;
        if (count < 0) {
            return;

        };
        currentClicked ? setupResult(count) : setupAppointment(count);

        setCurrentLimit(count);
    }

    const clickPrev = (e) => {
        e.preventDefault();
        let count = currentLimit + 5;

        if (currentClicked) {
            if (count >= resultLength) {
                count = resultLength;
            }
            setupResult(count)
        } else {
            if (count >= appointmentLength) {
                count = appointmentLength;
            }
            setupAppointment(count);

        }
        setCurrentLimit(count);
        console.log(resultLength);
    }

    const changeToAppointment = (e) => {
        e.preventDefault();
        setCurrentClicked(false);
        setCurrentLimit(0);
    }

    const changeToResult = (e) => {
        e.preventDefault();
        setCurrentClicked(true);
        setCurrentLimit(0);
    }

    useEffect(() => {
        setup();
    }, [setupStatus])

    useEffect(() => {
        if (setupStatus) {
            setupAppointment(appointmentLength);
            setupResult(resultLength);
        }

    }, [appointmentLength, setupStatus, resultLength])



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
                        <div className="auth-inner">
                            <button id="back-button">
                                <Link className="nav-link" to={"/user-landing-page"} style={{ color: "black" }} >Back</Link>
                            </button>
                            <h3>History</h3>

                            <div className="side-by-side-button">
                                <button type="submit" className="btn custom-button" onClick={changeToResult} style={{ marginRight: '1px' }}>
                                    Results
                        </button>

                                <button type="submit" className="btn custom-button" onClick={changeToAppointment}>
                                    Appointments
                        </button>
                            </div>

                            {
                                currentClicked
                                    ?
                                    resultList
                                    :
                                    appointmentList
                            }
                            <div className="bottom_buttons">
                                <button className="btn btn-primary btn-block" onClick={clickPrev} style={{ width: "20%", marginTop: "8px" }}>Previous</button>
                                <button className="btn btn-primary btn-block" onClick={clickNext} style={{ width: "20%" }}>Next</button>
                            </div>


                        </div>
                    </div>
                </> : onUnauthorised()}
            {backToLoginPage ? <Redirect to={"/sign-in"} /> : ""}
        </>

    )

}

export default UserHistory;