import React, { useState, useEffect }  from "react";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";

const ProviderInputResultPage = (props) => {

    const [pressed, setPressed] = useState(false);
    const [name, setName] = useState("");
    const [hkid, setHKID] = useState("");
    const [date, setDate] = useState("");
    const [ethAdd, setEthAdd] = useState("");
    const [result, setResult] = useState("");
    const [setupStatus, setSetupStatus] = useState(false);
    const [web3 , setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [etherAmt, setEtherAmt] = useState("");

    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);

        setContract(contract_);
        setSetupStatus(true);
    }

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleDate = (e) =>{
        e.preventDefault();
        setDate(e.target.value);
    }
    const handleHKID = (e) =>{
        e.preventDefault();
        setHKID(e.target.value);
    }
    const handleEthAdd = (e) =>{
        e.preventDefault();
        setEthAdd(e.target.value);
    }

    const handleResult = (e) =>{
        e.preventDefault();
        setResult(e.target.value);
    }

    const handleEther = (e) => {
        e.preventDefault();
        setEtherAmt(e.target.value);
    }

    const uploadResult = async (e) =>{
        e.preventDefault();
        try{
            await contract.methods.addPendingHealthRecord(result, date, localStorage.getItem("name"), localStorage.getItem("location"), ethAdd, etherAmt);
            alert("Success!");
            window.location.reload();
        }catch(error){
            console.log(error);
            alert(error);
        }

    }

    useEffect(() => {
        setup();
    }, [setupStatus])

    return (
        <div className="auth-inner"> 
            <form>
                <h3 className = "title">Input Result</h3>

                <div className = "split-container">
                    <div className = "left-half-container">
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
                    <div className = "right-half-container">
                        <div className="form-group">
                            <input type="text" value={name}  className="form-control" placeholder="Enter Name" onChange={handleName}/>
                        </div>
                        <div className="form-group">
                            <input type="text" value={date}  className="form-control" placeholder="Enter Date" onChange={handleDate}/>
                        </div>
                        <div className="form-group">
                            <input type="text" value={hkid}  className="form-control" placeholder="Enter HKID" onChange={handleHKID}/>
                        </div>
                        <div className="form-group ">
                            <input type="text" value={ethAdd}  className="form-control" placeholder="Enter Ethereum address" onChange={handleEthAdd}/>
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

    )
}

export default ProviderInputResultPage;