import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";


const AppointmentRow = (props) => {

    const [result, setResult] = useState("");
    const [etherAmt, setEtherAmt] = useState("");
    const [styleState, setStyleState] = useState("center_hidden");

    const handleResult = (e) => {
        e.preventDefault();
        setResult(e.target.value);
    }

    const handleEther = (e) => {
        e.preventDefault();
        setEtherAmt(e.target.value);
    }

    const openPayment = () => {
        setStyleState("center_popup");
    }

    const closePayment = (e) => {
        e.preventDefault();
        setStyleState("center_hidden");
    }

    const uploadResult = async (e) => {
        e.preventDefault();
        props.contract.methods.addPendingHealthRecord(result, props.date, localStorage.getItem("name"), localStorage.getItem("location"), props.ethAdd, etherAmt).send({from: localStorage.get("eth_address")}, (err, result) => {
            if(err){
                alert(err);

            }else{
                alert("Success!");
                window.location.reload();
            }

        })
    }
    // return (

    //   <>
    //   <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    //       <div className="container">

    //       <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
    //       <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    //           <ul className="navbar-nav ml-auto">
    //               <li className="nav-item">
    //               <Link className="nav-link" to={"/sign-in"}>Log Out</Link>
    //               </li>
    //           </ul>
    //       </div>
    //       </div>
    //   </nav>

    // <div className="auth-wrapper">
    //     <div className="auth-inner"> 
    //         <form>
    //             <h3 >Incoming Appointment</h3>
    // }


    return (
        <div className="column_container">
            <div className="form-group border-bottom" onClick={openPayment}>
                <label className="appointment-info">Ethereum Address: {props.ethAdd} </label>
                <label className="appointment-info">Date: {props.date} </label>
            </div>

            <div className={styleState}>
                <button onClick={closePayment}>X</button>
                <div className="auth-inner">
                    <form>
                        <h3 className="title">Input Result</h3>

                        <div className="split-container">
                            <div className="left-half-container">
                                <div className="form-group">
                                    <label>Name: </label>
                                </div>
                                <div className="form-group">
                                    <label>Date: </label>
                                </div>
                                <div className="form-group">
                                    <label>HKID: </label>
                                </div>
                                <div className="form-group medium-label">
                                    <label>Ethereum Address: </label>
                                </div>
                                <div className="form-group">
                                    <label>Test Result: </label>
                                </div>
                                <div className="form-group">
                                    <label>Ether payable: </label>
                                </div>
                            </div>
                            <div className="right-half-container">
                                <div className="form-group">
                                    <input type="text" value={props.name} className="form-control" readOnly placeholder="Enter Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" value={props.date} className="form-control" readOnly placeholder="Enter Date" />
                                </div>
                                <div className="form-group">
                                    <input type="text" value={props.hkid} className="form-control" readOnly placeholder="Enter HKID" />
                                </div>
                                <div className="form-group ">
                                    <input type="text" value={props.ethAdd} className="form-control" readOnly placeholder="Enter Ethereum address" />
                                </div>
                                <div className="form-group">
                                    <input type="text" value={result} className="form-control" placeholder="Enter Test Result" onChange={handleResult} />
                                </div>

                                <div className="form-group">
                                    <input type="text" value={etherAmt} className="form-control" placeholder="Enter Ether Amount" onChange={handleEther} />
                                </div>
                            </div>

                        </div>


                        <button type="submit" onClick={uploadResult} className="btn btn-primary btn-block result-btn">Confirm</button>

                    </form>
                </div>
            </div>

        </div>

    )

}



const ProviderIncomingAppointment = () => {

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [setupStatus, setSetupStatus] = useState(false);
    const [appointmentList, setAppointmentList] = useState("");
    const [currentLimit, setCurrentLimit] = useState(0);
    const [appointmentLength, setAppointmentLength] = useState(5);
    const [pageLimit, setPageLimit] = useState(5);
    const [account, setAccount] = useState(localStorage.getItem("eth_address"));
    
    const EthCrypto = require('eth-crypto');

    const setup = async () => { 
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        let length = 0;

        contract_.methods.getUserAppointmentListLength(account).call({ from: account }, function (error, result) {
            setAppointmentLength(result);
            setContract(contract_);
            setSetupStatus(true);

        })

    }



    const makeRow = async (start) => {
        let temp_list = [];
        var temp;
        for (let i = start - 1; i >= start - pageLimit; i--) {
            if (i < 0) {
                break;
            }


            contract.methods.getProviderAppointmentList(i, account).call({ from: account }, function (error, result) {
                temp = result; //patient add, date, encrypted info
                if (temp !== "") {
                    const back_to_json = EthCrypto.cipher.parse(temp["2"]);
                    EthCrypto.decryptWithPrivateKey(
                            localStorage.getItem("private_key"), // privateKey
                            back_to_json
                            
                    ).then((message) =>{
                            let parsedMessage = JSON.parse(message);
                            temp_list.push(<AppointmentRow key={i} count={i} ethAdd={temp["0"]} date={temp["1"]} hkid={parsedMessage["hkid"]} name={parsedMessage["name"]} contract={contract} web3={web3}></AppointmentRow>)
                            setAppointmentList(temp_list);
                    })
                }

            }
        )
    }
            // }).then(async onfulFilled => {
                
            // }, onRejected => {
            //     if (temp !== "") {
            //         temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //         console.log("que?");
            //     }
            // })

            // promise = contract.methods.getProviderAppointmentList(i, account).call({ from: account }, function (error, result) {
            //     temp = result; //patient add, date, encrypted info
            // }).then(async onfulFilled => {
            //     if (temp !== "") {
            //         const back_to_json = EthCrypto.cipher.parse(temp["2"]);
            //         var message = await EthCrypto.decryptWithPrivateKey(
            //                 localStorage.getItem("private_key"), // privateKey
            //                 back_to_json
                            
            //             ).then((message) =>{
            //                 let parsedMessage = JSON.parse(message);
            //                 temp_list.push(<AppointmentRow key={i} count={i} ethAdd={temp["0"]} date={temp["1"]} hkid={parsedMessage["hkid"]} name={parsedMessage["name"]} contract={contract} web3={web3}></AppointmentRow>)
            //         })

            //        // temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //       //  console.log("que?");
            //     }
            // }, onRejected => {
            //     if (temp !== "") {
            //         temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //         console.log("que?");
            //     }
            // })


        
        //promise.then((value) => {
        // if (continueFlag) {
        //     setAppointmentList(temp_list);
        // }
        //})

    }

    const clickNext = (e) => {
        e.preventDefault();
        let count = currentLimit - 5;
        if (count < 0) {
            return;
        };
        makeRow(count);
        setCurrentLimit(count);
    }

    const clickPrev = (e) => {
        e.preventDefault();
        let count = currentLimit + 5;
        if (count >= appointmentLength) {
            count = appointmentLength;
        }
        makeRow(count);
        setCurrentLimit(count);

    }

    useEffect(() => {
        setup();
    }, [setupStatus])

    useEffect(() => {
        if (setupStatus) {
            makeRow(appointmentLength);
        }

    }, [setupStatus, appointmentLength])

    return (
        <div className="auth-inner">

            <h3 >Incoming Appointment</h3>

            {appointmentList}


            <button onClick={clickPrev}>Previous</button>
            <button onClick={clickNext}>Next</button>
        </div>

    )



}

export default ProviderIncomingAppointment;
