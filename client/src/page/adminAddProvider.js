import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";

const AdminAddProvider = () => {
    const initialState = {
        username: "",
        name: "",
        address: "",
        password: "",
        eth_address: "",
        location: "",
        public_key: "",
        encrypted: "",
    };

    const [showUser, setShowUser] = useState(false);
    const [showProvider, setShowProvider] = useState(false);
    const [showAll, setShowAll] = useState(true);
    const [field, setField] = useState(initialState);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [adminAddress, setAdminAddress] = useState("");
    

    const changeValue = (comp, val) => {
        setField({
            ...field,
            [comp]: val,
        })
    }


    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        web3_.eth.getAccounts().then((acc) =>{
            setAdminAddress(acc[0]);
        })
        setContract(contract_);

    }


    const toHospital = (e) => {
        e.preventDefault();
        contract.methods.registerHospital(field.eth_address, field.location, field.name, field.public_key, field.encrypted).send({ from: {adminAddress} , gas: 3000000 }, function (error, result) {
            if (error) {
                
                window.alert("Error.");
            }
            window.alert("Success!");
        });
    }
    const toKiosk = (e) => {
        e.preventDefault();
        contract.methods.registerKiosk(field.eth_address, field.location, field.name, field.public_key,  field.encrypted).send({ from: {adminAddress} , gas: 3000000 }, function (error, result) {
            if (error) {
                alert("Error.");
            }
            alert("Success!");
        });

    }

    const openUser = (e) => {
        e.preventDefault();
        setShowAll(false);
        setShowUser(true);

    }

    const openProvider = (e) => {
        e.preventDefault();
        setShowAll(false);
        setShowProvider(true);

    }

    const closeAll = (e) => {
        e.preventDefault();
        setShowAll(true);
        setShowUser(false);
        setShowProvider(false);

    }

    useEffect(() => {
        setup();
    }, []);


    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    {showAll ? "" : <button id="back-button" onClick={closeAll}> Back </button>}
                    <form>
                        {showAll ? <h3>Register provider</h3> : ""}

                        {showAll ?
                            <div >
                                <button type="submit" className="btn custom-button btn-block loginButton" onClick={openUser} >
                                    Add Kiosk
                        </button>

                                <button type="submit" className="btn custom-button btn-block loginButton" onClick={openProvider}>
                                    Add Hospital
                        </button>
                                {/* <button className="login-page-button-unit" onClick={(e) => this.openUser(e)}>
                            User
                        </button>
                        <button className="login-page-button-unit" onClick={(e) => this.openProvider(e)}>
                            Test Provider
                        </button> */}


                            </div>
                            : ""}


                        {showUser ?

                            <div>


                                <h3>New Kiosk Provider</h3>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={field.name} placeholder="Enter name" onChange={(e) => changeValue('name', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Ethereum Address </label>
                                    <input type="text" className="form-control" value={field.eth_address} placeholder="Enter Ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" value={field.location} placeholder="Enter location" onChange={(e) => changeValue('location', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Provider public key</label>
                                    <input type="text" className="form-control" value={field.public_key} placeholder="Enter public key" onChange={(e) => changeValue('public_key', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Encrypted login information</label>
                                    <input type="text" className="form-control" value={field.encrypted} placeholder="Provider encrypted login info" onChange={(e) => changeValue('encrypted', e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" onClick={toKiosk} >Add</button>

                            </div>


                            : ""}

                        {showProvider ?

                            <div>

                                <h3>New Hospital Provider</h3>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={field.name} placeholder="Enter name" onChange={(e) => changeValue('name', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Ethereum Address </label>
                                    <input type="text" className="form-control" value={field.eth_address} placeholder="Enter Ethereum address" onChange={(e) => changeValue('eth_address', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" value={field.location} placeholder="Enter location" onChange={(e) => changeValue('location', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Provider public key</label>
                                    <input type="text" className="form-control" value={field.public_key} placeholder="Enter public key" onChange={(e) => changeValue('public_key', e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Encrypted login information</label>
                                    <input type="text" className="form-control" value={field.encrypted} placeholder="Provider encrypted login info" onChange={(e) => changeValue('encrypted', e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" onClick={toHospital}>Add</button>
                            </div>
                            : ""}

                    </form>
                </div>
            </div>

        </>
    );

}



export default AdminAddProvider;