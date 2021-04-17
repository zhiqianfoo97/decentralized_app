import React, { useState, useEffect } from "react";

import PickyDateTime from "react-picky-date-time";
import Dropdown from 'react-bootstrap/Dropdown';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const UserMakeAppointment = () => {
    const logged = localStorage.getItem("logged");
    var backToLoginPage = false;
    const [showPickyDateTime, setShowPickyDateTime] = useState(true);
    const [date, setDate] = useState('19');
    const [month, setMonth] = useState('04');
    const [year, setYear] = useState('2021');
    const [hour, setHour] = useState('03');
    const [minute, setMinute] = useState('10');
    const [second, setSecond] = useState('40');
    const [meridiem, setMeridiem] = useState('PM');
    const [center, setCenter] = useState("Choose a center");

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
                                                <Dropdown.Item href="#/action-1" onClick={() => setCenter("Queen's Mary Hospital")}>Queen's Mary Hospital</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2" onClick={() => setCenter("Queen's Steven Hospital")}>Queen's Steven Hospital</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3" onClick={() => setCenter("Queen's James Hospital")}>Queen's James Hospital</Dropdown.Item>
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
                                    <button type="submit" className="btn btn-primary mt-4">Make Appointment</button>
                                </div>


                            </form>

                        </div>
                    </div>
                </> : onUnauthorised()}
            {backToLoginPage ? <Redirect to={"/sign-in"} />: ""}
        </>

    )


}

export default UserMakeAppointment;