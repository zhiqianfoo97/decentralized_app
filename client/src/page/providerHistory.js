import React, { useState, useEffect }  from "react";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const HistoryRow = (props) => {
    return (
        <div className="column_container">
            <div className="form-group border-bottom">
                <label>Ethereum Address: {props.userAddress} </label>
                <label>Date: {props.date} </label> <br></br>
            </div>
        </div>
    )
}

const ProviderHistory = (props) => {
    const logged = localStorage.getItem("logged");
    var backToLoginPage = false;
    const [pageLimit, setPageLimit] = useState(5);
    const [setupStatus, setSetupStatus] = useState(false);
    const [resultRow, setResultRow] = useState("");
    const [currentLimit, setCurrentLimit] = useState(0);
    const [historyLength, setHistoryLength] = useState(10);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(localStorage.getItem("eth_address"));


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
        let length = 10;

        contract_.methods.getProviderHistoryListLength(account).call({from: account}, function(error, result){
            setHistoryLength(10);  // change to result
            setContract(contract_);
            setSetupStatus(true);

        })


        // try{
        //     length = await web3_.methods.getProviderHistoryListLength(account).call({from: account});
        // }catch(error){
        //     console.log("Provider history does not exist.");
        // }finally{
        //     setContract(contract_);
        //     setSetupStatus(true);
        //     setHistoryLength(length);
        // }


    }

    const setupHistory = async (start) => {
        let temp_list = [];
        let temp = {"0": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c", "1": "01-02-21"};
        let continueFlag = true;
        for (let i = start - 1 ; i >= start - pageLimit; i--){
            if (i < 0){
                continueFlag = false;
                break;
            }

            try {
                temp = await contract.methods.getProviderHistoryList(i, account).call({ from: account });
            } catch (error) {
                console.log("Provider history does not exist.");
            } finally {
                if (temp !== "") {
                    temp_list.push(<HistoryRow key={i} userAddress={temp["0"]} date={temp["1"]}></HistoryRow>)
                }

            }


            //let temp = {"0": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c", "1": "01-02-21"};
            // 0 = patient address, 1 = date

            // contract.methods.getProviderHistoryList(i, account ).call({from: account}, function(error, result){
            //     if(temp !== ""){
            //         temp_list.push(<HistoryRow key={i} userAddress={temp["0"]} date={temp["1"]}></HistoryRow>)
            //     }
            //     //setResultRow(temp_list);


            // })



        }
        if(continueFlag){
            setResultRow(temp_list)
        }
        
        
    }

    const clickNext = (e) => {
        e.preventDefault();
        let count = currentLimit - 5;
        if (count < 0){
            return;
        };
        setupHistory(count);
        setCurrentLimit(count);
    }

    const clickPrev = (e) => {
        e.preventDefault();
        let count = currentLimit + 5;
        if (count >= historyLength){
            count = historyLength;
        }
        setupHistory(count);
        setCurrentLimit(count);

    }

    useEffect(() => {
        setup();
    }, [setupStatus])

    useEffect(() =>{
        if(setupStatus){
            setupHistory(historyLength );
        }

    }, [setupStatus, historyLength])

    return (

        <>
        {logged?
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
                        <button id="back-button">
                            <Link className="nav-link" to={"/provider-landing-page"} style={{ color: "black" }} >Back</Link>
                        </button>
                        <h3>History</h3>

                        {resultRow}


                    </form>
                    <div className="bottom_buttons">
                    <button className="btn btn-primary btn-block" onClick={clickPrev} style={{ width: "20%", marginTop: "8px" }}>Previous</button>
                    <button className="btn btn-primary btn-block" onClick={clickNext} style={{ width: "20%"}}>Next</button>
                    </div>
                </div>
            </div>
            </> :onUnauthorised()}
            {backToLoginPage ? <Redirect to={"/sign-in"} />: ""}

        </>
    )
}

export default ProviderHistory;