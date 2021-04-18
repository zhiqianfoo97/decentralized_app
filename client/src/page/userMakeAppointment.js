import React, { useState, useEffect } from "react";

import PickyDateTime from "react-picky-date-time";
import Dropdown from 'react-bootstrap/Dropdown';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";


const UserMakeAppointment = () => {
    const logged = localStorage.getItem("logged");
    var backToLoginPage = false;
    const [showPickyDateTime, setShowPickyDateTime] = useState(true);
    const [date, setDate] = useState('30');
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2021');
    const [hour, setHour] = useState('03');
    const [minute, setMinute] = useState('10');
    const [second, setSecond] = useState('40');
    const [meridiem, setMeridiem] = useState('PM');
    const [center, setCenter] = useState("Choose a center");
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [setupStatus, setSetupStatus] = useState(false);
    const [hospitalList, setHospitalList] = useState("");
    const [hospitalLength, setHospitalLength] = useState(0);
    const [hospitalEthAdd, setHospitalEthAdd] = useState("");
    const [hospitalLocation, setHospitalLocation] = useState("");
    const [hospitalPbKey, setHospitalPbKey] = useState("");

    const EthCrypto = require('eth-crypto');

    const changeValue = (e) => {
        console.log(e.target.textContent);
        setCenter(e.target.textContent);
    }

    const logOut = () => {
        localStorage.clear();
    }

    const onUnauthorised = () => {
        backToLoginPage = true;
    }

    const onYearPicked = (res) => {
        const { year } = res;
        setYear(year);
    };


    const onMonthPicked = (res) => {
        const { month, year } = res;
        setYear(year);
        setMonth(month);
    };


    const onDatePicked = (res) => {
        const { date, month, year } = res;
        setYear(year);
        setMonth(month);
        setDate(date);
    };

    const onResetDate = (res) => {
        const { date, month, year } = res;
        setYear(year);
        setMonth(month);
        setDate(date);
    };

    const onResetDefaultDate = (res) => {
        const { date, month, year } = res;
        setYear(year);
        setMonth(month);
        setDate(date);
    };

    const onSecondChange = (res) => {
        setSecond(res.value);
    };

    const onMinuteChange = (res) => {
        setMinute(res.value);
    };

    const onHourChange = (res) => {
        setHour(res.value);
    };

    const onMeridiemChange = (res) => {
        setMeridiem(res.value);
    };

    const onResetTime = (res) => {
        setSecond(res.clockHandSecond.value);
        setMinute(res.clockHandMinute.value);
        setHour(res.clockHandHour.value);
    };

    const onResetDefaultTime = (res) => {
        setSecond(res.clockHandSecond.value);
        setMinute(res.clockHandMinute.value);
        setHour(res.clockHandHour.value);
    };

    const onClearTime = (res) => {
        setSecond(res.clockHandSecond.value);
        setMinute(res.clockHandMinute.value);
        setHour(res.clockHandHour.value);
    };

    const openPickyDateTime = () => {
        setShowPickyDateTime(true);
    };

    const onClose = () => {
        setShowPickyDateTime(false);
    };


    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        let listLength = await contract_.methods.getHospitalListLength().call({ from: localStorage.getItem("eth_address") });
        setHospitalLength(listLength);
        setContract(contract_);
        setSetupStatus(true);
    }


    const setupAppointmentRow = async (start) => {
        let temp_list = [];
        let temp = "";
        for (let i = start - 1; i >= 0; i--) {
            console.log("1");
            if (i < 0) {
                break;
            }

            // promise = contract.methods.getHospitalList(i).call({ from: localStorage.getItem("eth_address") }, function (error, result) {
            //     temp = result;
            // }).then(onfulFilled => {
            //     if (temp !== "") {

            //         temp_list.push(<Dropdown.Item href="#/action-1" key={i}
            //             onClick={() => {
            //                 setCenter(temp["1"]);
            //                 setHospitalEthAdd(temp["0"]);
            //                 setHospitalLocation(temp["2"]);
            //             }}>{temp["1"]}</Dropdown.Item>)

            //     }
            // }, onRejected => {
            //     // temp = { "0": "0xF170e89d6Fe3F7a44E9549544473546b4E5AE42F", "1": "HKU", "2": "POK FU LAM" };
            //     // if (temp !== "") {
            //     //     temp_list.push(<Dropdown.Item href="#/action-3" key={i}
            //     //         onClick={() => {

            //     //             setCenter(temp["1"]);
            //     //             setHospitalEthAdd(temp["0"]);
            //     //             setHospitalLocation(temp["2"]);
            //     //         }}>{temp["1"]}</Dropdown.Item>)

            //     // }
            //     console.log("nooo");

            contract.methods.getHospitalList(i).call({ from: localStorage.getItem("eth_address") }, (error, result) => {

                temp = result;
                if (temp !== "") {
                    temp_list.push(<Dropdown.Item href="#/action-3" key={i}
                        onClick={(event) => {
                            changeValue(event);
                            setHospitalEthAdd(temp["0"]);
                            setHospitalLocation(temp["2"]);
                            setHospitalPbKey(temp["3"]);
                        }}>{temp["1"]}</Dropdown.Item>)

                }
            });
            // }, onRejected => {
            //     console.log('50');
            //     temp = { "0": "0xF170e89d6Fe3F7a44E9549544473546b4E5AE42F", "1": "HKU", "2": "POK FU LAM" };
            //     if (temp !== "") {
            //         temp_list.push(<Dropdown.Item key={i}
            //             onClick={(event) =>{
            //                 changeValue(event);
            //                 setHospitalEthAdd(temp["0"]);
            //                 setHospitalLocation(temp["2"]);
            //                 setHospitalPbKey(temp["3"]);
            //             } }>{temp["1"]}</Dropdown.Item>)

            //     }

            // })



            //promise.then((value) => {
            setHospitalList(temp_list);
            //}
            //)


        }
    }


    const putCenter = (name) => {
        setCenter(name);
    }

    const makeAppointment = async (e) => {
        e.preventDefault();
        let timePicked = `${date}/${month}/${year} ${hour}:${minute}:${second} ${meridiem}`
        let userInfo = { "name": localStorage.getItem("name"), "hkid": localStorage.getItem("hkid") };
        console.log(hospitalPbKey);
        console.log(hospitalLocation);
        console.log(hospitalEthAdd);
        await EthCrypto.encryptWithPublicKey(
            hospitalPbKey, // publicKey
            JSON.stringify(userInfo) // message
        ).then(function (result) {
            const to_string = EthCrypto.cipher.stringify(result);
            contract.methods.userMakeAppointment(center, hospitalLocation, timePicked, hospitalEthAdd, to_string).send({
                from: localStorage.getItem("eth_address"),
                gas: 3000000
            }, function (error, result) {
                alert("Success!");
                //window.location.reload();


            });

        });

    }


    useEffect(() => {
        setup();

    }, [setupStatus])

    useEffect(() => {
        if (setupStatus) {
            setupAppointmentRow(hospitalLength);
        }

    }, [setupStatus, hospitalLength])

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
                        <div className="auth-inner" style={{ width: "fit-content" }}>

                            <form>
                                <button id="back-button">
                                    <Link className="nav-link" to={"/user-landing-page"} style={{ color: "black" }} >Back</Link>
                                </button>
                                <h3 className="title">Make Appointment</h3>
                                <div className="row_container" style={{ marginBottom: '20px' }}>
                                    <div className="center_title">
                                        Select a Center:
                    </div>
                                    <div className="center_item">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                {center}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {hospitalList}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="row_container" style={{ marginBottom: '20px' }}>
                                    <div className="center_title">
                                        Choose a date and time:
                     </div>
                                    <div className="center_item">
                                        <input
                                            style={{ padding: '10px' }}
                                            value={`${date}/${month}/${year} ${hour}:${minute}:${second} ${meridiem}`}
                                            onChange={() => { }}
                                            onClick={() => setShowPickyDateTime(true)}
                                        />
                                    </div>

                                </div>


                                <PickyDateTime
                                    size="s"
                                    mode={1}
                                    show={showPickyDateTime}
                                    locale="en-us"
                                    defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // OPTIONAL. format: "HH:MM:SS AM"
                                    defaultDate={`${date}/${month}/${year}`} // OPTIONAL. format: "MM/DD/YYYY"
                                    onClose={() => setShowPickyDateTime(false)}
                                    onYearPicked={res => onYearPicked(res)}
                                    onMonthPicked={res => onMonthPicked(res)}
                                    onDatePicked={res => onDatePicked(res)}
                                    onResetDate={res => onResetDate(res)}
                                    onResetDefaultDate={res => onResetDefaultDate(res)}
                                    onSecondChange={res => onSecondChange(res)}
                                    onMinuteChange={res => onMinuteChange(res)}
                                    onHourChange={res => onHourChange(res)}
                                    onMeridiemChange={res => onMeridiemChange(res)}
                                    onResetTime={res => onResetTime(res)}
                                    onResetDefaultTime={res => onResetDefaultTime(res)}
                                    onClearTime={res => onClearTime(res)}
                                />
                                <div className="btn-wrapper">
                                    <button type="submit" className="btn btn-primary mt-4" onClick={makeAppointment}>Make Appointment</button>
                                </div>


                            </form>

                        </div>
                    </div>
                </> : onUnauthorised()}
            {backToLoginPage ? <Redirect to={"/sign-in"} /> : ""}



        </>

    )


}

export default UserMakeAppointment;