import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";
import { Redirect } from "react-router-dom";


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
        try {
            await props.contract.methods.addPendingHealthRecord(result, props.date, localStorage.getItem("name"), localStorage.getItem("location"), props.ethAdd, etherAmt);
            alert("Success!");
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert(error);
        }
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
                <label className="appointment-info">Haha : {props.count}</label>
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
    const providerLogged = localStorage.getItem("providerLogged");
    var backToLoginPage = false;
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [setupStatus, setSetupStatus] = useState(false);
    const [appointmentList, setAppointmentList] = useState("");
    const [currentLimit, setCurrentLimit] = useState(0);
    const [appointmentLength, setAppointmentLength] = useState(5);
    const [pageLimit, setPageLimit] = useState(5);
    const [account, setAccount] = useState(localStorage.getItem("eth_address"));

    const EthCrypto = require('eth-crypto');

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
        let length = 5;

        contract_.methods.getUserAppointmentListLength(account).call({ from: account }, function (error, result) {
            setAppointmentLength(5);
            setContract(contract_);
            setSetupStatus(true);

        })



        // try{
        //     length = await contract_.methods.getUserAppointmentListLength(account).call({from: account});

        // }catch(error){
        //     console.log("Provider history does not exist.");
        // }finally{
        //     setContract(contract_);
        //     setSetupStatus(true);
        //     setAppointmentLength(length);
        // }


    }

    // const getData = async (i, account) =>{
    //     temp = await contract.methods.getProviderAppointmentList(i, account ).call({from: account}); 

    //     return(
    //         <AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>
    //     )
    // }

    const makeRow = async (start) => {
        let temp_list = [];
        let continueFlag = true;
        var temp;
        let ethAdd = "";
        let date = "";
        let hkid = "";
        let name = "";
        var promise;
        for (let i = start - 1; i >= start - pageLimit; i--) {
            if (i < 0) {
                continueFlag = false;
                break;
            }

            // try{
            //     promise = new Promise(function(resolve,reject){
            //          contract.methods.getProviderAppointmentList(i, account ).call({from: account}, function(error, result){
            //             console.log(error);
            //             temp = result;
            //         }); 
            //     }).then(function(temp){
            //         temp = "A";
            //          if(temp !== ""){
            //             temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //             console.log("que?");
            //         }
            //     }) 

            //     // temp = await contract.methods.getProviderAppointmentList(i, account ).call({from: account}); 
            //     // temp.then(function(temp){
            //     //     if(temp !== ""){
            //     //         temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //     //         console.log("que?");
            //     //     }
            //     // })
            // }catch(error){
            //     console.log("Provider appointment does not exist.");
            //     temp = "a";
            //     promise = new Promise(function(resolve,reject){
            //         setTimeout(resolve, 500);
            //     }).then(function(){
            //          ethAdd = "dsfsdfsdf";
            //          date = "341ad";
            //          hkid = "3234324";
            //          name= "fck";
            //          if(temp !== ""){
            //             temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //             console.log("que?");
            //         }
            //     }) 


            // }finally{
            //     // temp.then((temp)=>{
            //     //     if(temp !== ""){
            //     //         temp_list.push(<AppointmentRow key={i} count={i} ethAdd={temp["ethAdd"]} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //     //         console.log("que?");
            //     //     }
            //     // })
            //     console.log("fck u");
            // }

            // const back_to_json = EthCrypto.cipher.parse(to_string);

            // var message = await EthCrypto.decryptWithPrivateKey(
            //     identity.privateKey, // privateKey
            //     back_to_json

            // ).then((message) =>{
            //     console.log(message);
            // })


            promise = contract.methods.getProviderAppointmentList(i, account).call({ from: account }, function (error, result) {
                temp = result; //patient add, date, encrypted info
            }).then(async onfulFilled => {
                if (temp !== "") {
                    const back_to_json = EthCrypto.cipher.parse(temp["2"]);
                    var message = await EthCrypto.decryptWithPrivateKey(
                        localStorage.getItem("private_key"), // privateKey
                        back_to_json

                    ).then((message) => {
                        let parsedMessage = JSON.parse(message);
                        temp_list.push(<AppointmentRow key={i} count={i} ethAdd={temp["0"]} date={temp["1"]} hkid={parsedMessage["hkid"]} name={parsedMessage["name"]} contract={contract} web3={web3}></AppointmentRow>)
                    })

                    // temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
                    //  console.log("que?");
                }
            }, onRejected => {
                console.log("fck");
                console.log("Inside");
                temp = "A";
                ethAdd = "sam very handsome";
                if (temp !== "") {
                    temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
                    console.log("que?");
                }
            })


            //let temp = {"0": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c", "1": "01-02-21"};
            // 0 = patient address, 1 = date, 2 = encrypted patient info.
            // contract.methods.getProviderAppointmentList(i, account ).call({from: account}, function(error, result){
            //     let ethAdd = "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c";
            //     let date = "01-02-21";
            //     let hkid = "M1238123";
            //     let name = "Ali";
            //     console.log("HELLO " + temp);


            //     if(temp !== ""){
            //         temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
            //         console.log("que?");
            //     }

            //     console.log("temp_list = "+ temp_list);


            // })






        }
        promise.then((value) => {
            if (continueFlag) {
                setAppointmentList(temp_list);
            }
        })

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
        <>
            {providerLogged ?
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
                            <form>

                                <h3 >Incoming Appointment</h3>

                                {appointmentList}


                                <div className="bottom_buttons">
                                    <button className="btn btn-primary btn-block" onClick={clickPrev} style={{ width: "20%", marginTop: "8px" }}>Previous</button>
                                    <button className="btn btn-primary btn-block" onClick={clickNext} style={{ width: "20%" }}>Next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </> : onUnauthorised()}
            {backToLoginPage ? <Redirect to={"/sign-in"} /> : ""}
        </>

    )



}

export default ProviderIncomingAppointment;
