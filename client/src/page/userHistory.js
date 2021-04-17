import React, { useState, useEffect } from "react";
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


const ResultRow = (props) => {
    const [styling, setStyling] = useState("center_hidden");
    const openPopup = () => {
        setStyling("center_popup");
    }

    const closePopup = (e) => {
        e.preventDefault();
        setStyling("center_hidden");
    }

    return (
        <div className="column_container">
            <div className="form-group border-bottom" onClick={openPopup}>
                <label>Venue: {props.provName} </label><br></br>
                <label>Address: {props.provLocation}</label><br></br>
                <label>Date: {props.date} </label> <br></br>
                <label>Result: {props.paidStat ? props.result : "****"}</label>
                <label> Count: {props.count} </label>
            </div>

            <div className={styling}>
                <button onClick={closePopup}> X </button>
                <UserResult paidStat={props.paidStat} date={props.date} amount={props.amount} provName={props.provName}
                    payableTo={props.payableTo} provLocation={props.provLocation}
                    name={localStorage.getItem("name")} hkid={localStorage.getItem("hkid")}
                    web3={props.web3} account={props.account} count={props.count} contract={props.contract}
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

    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        console.log("NETWORK ID = " + networkID);
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        let appointLength = 0;
        let resultLength_ = 0;

        contract_.methods.getUserAppointmentListLength(account).call({ from: account }, function (error, result) {
            setAppointmentLength(5);
        });

        contract_.methods.getPendingHealthRecordLength(account).call({ from: account }, function (error, result) {
            setResultLength(5);
        });


        // try{
        //     appointLength = await contract.methods.getUserAppointmentListLength(account).call({from: account});
        // }catch(err){
        //     appointLength = 0;
        // }

        // try{
        //     resultLength_ = await contract.methods.getPendingHealthRecordLength(account).call({from: account});
        // }catch(err){
        //     resultLength_ = 0;
        // }


        setContract(contract_);
        //setAppointmentLength(appointLength);
        //setResultLength(resultLength_);
        setSetupStatus(true);
    }

    const setupResult = async (start) => {
        let temp_list = [];
        let temp = "";
        let provInfo = "";
        let continueFlag = true;
        for (let i = start - 1; i >= start - pageLimit; i--) {
            if (i < 0) {
                continueFlag = false;
                break;
            }


            try {
                temp = await contract.methods.getPendingHealthRecord(i, account).call({ from: account });
            } catch (err) {
                console.log("Health record info err : " + err);
                temp = { "0": "pos", "1": "01-02-21", "2": "Queen mary", "3": "Tsim sha tsui", "4": "1", "5": false, "6": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c" };
            }

            try {
                provInfo = await contract.methods.getProviderInfo(temp["6"]).call({ from: account });
            } catch (err) {
                console.log("Provider info err : " + err);
                provInfo = { "0": "Queen mary", "1": "HKU" };
            }
            //let temp = await contract.methods.getPendingHealthRecord(i, account ).call({from: account}); 
            //let temp = {"0": "pos", "1": "01-02-21", "2" : "Queen mary", "3": "Tsim sha tsui" ,"4":"1", "5": false, "6" : "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c"};
            // 0 = test result, 1 = date, 2 = placeName, 3 = place, 4 = amount, 5 = paid status, 6=payable address
            // to use, temp["0"]
            // let provInfo = {"0" :"Queen mary", "1":"HKU"};
            // 0 = place name, 1 = location

            if (temp !== "") {
                temp_list.push(<ResultRow key={i} type={true} provName={provInfo["0"]}
                    provLocation={provInfo["1"]} account={account} result={temp["0"]} date={temp["1"]}
                    placeName={temp["2"]} location={temp["3"]} amount={temp["4"]} paidStat={temp["5"]} payableTo={temp["6"]} web3={web3}
                    count={i} contract={contract}></ResultRow>)
            }

        }
        if (continueFlag) {
            setResultList(temp_list);
        }

    }

    const setupAppointment = async (start) => {
        let temp_list = [];
        let temp = "";
        let continueFlag = true;
        for (let i = start - 1; i >= start - pageLimit; i--) {
            if (i < 0) {
                continueFlag = false;
                break;
            }

            try {
                temp = await contract.methods.getUserAppointmentList(i, account).call({ from: account });
            } catch {
                console.log("Appointment does not exist");
            }
            //let temp = await contract.methods.getUserAppointmentList(i, account ).call({from: account}); 
            //let temp = {"0": "HKU", "1":"Pok fu lam", "2": "01-02-21"};
            // 0 = place name, 1 = location, 2 = date

            if (temp !== "") {
                temp_list.push(<AppointmentRow key={i}
                    type={false} account={account} placeName={temp["0"]} location={temp["1"]} date={temp["2"]}
                    count={i} ></AppointmentRow>)
            }


        }
        if (continueFlag) {
            setAppointmentList(temp_list);
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
        <div className="auth-inner">

            <h3>History</h3>

            <div className="side-by-side-button">
                <button type="submit" className="btn custom-button" onClick={changeToResult}>
                    Results
                    </button>

                <button type="submit" className="btn custom-button" onClick={changeToAppointment}>
                    Appointment
                    </button>
            </div>

            {
                currentClicked
                    ?
                    resultList
                    :
                    appointmentList
            }

            <button onClick={clickPrev}>Previous</button>
            <button onClick={clickNext}>Next</button>




        </div>

    )

}

export default UserHistory;