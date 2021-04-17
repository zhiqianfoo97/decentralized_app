import React, { useState, useEffect }  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";


const AppointmentRow = (props) =>{

    const [result, setResult] = useState("");
    const [etherAmt, setEtherAmt] = useState("");
    const [styleState, setStyleState] = useState("center_hidden");

    const handleResult = (e) =>{
        e.preventDefault();
        setResult(e.target.value);
    }

    const handleEther = (e) => {
        e.preventDefault();
        setEtherAmt(e.target.value);
    }

    const openPayment = () =>{
        setStyleState("center_popup");
    }

    const closePayment = (e) =>{
        e.preventDefault();
        setStyleState("center_hidden");
    }

    const uploadResult = async (e) =>{
        e.preventDefault();
        try{
            await props.contract.methods.addPendingHealthRecord(result, props.date, localStorage.getItem("name"), localStorage.getItem("location"), props.ethAdd, etherAmt);
            alert("Success!");
            window.location.reload();
        }catch(error){
            console.log(error);
            alert(error);
        }

    }


    return(
        <div className = "column_container">
            <div className="form-group border-bottom" onClick={openPayment}>
                    <label className="appointment-info">Ethereum Address: {props.ethAdd} </label> 
                    <label className="appointment-info">Date: {props.date} </label>     
                    <label className="appointment-info">Haha : {props.count}</label>                       
            </div>

            <div className={styleState}> 
                <button onClick={closePayment}>X</button>
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
                                <input type="text" value={props.name}  className="form-control" placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={props.date}  className="form-control" placeholder="Enter Date" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={props.hkid}  className="form-control" placeholder="Enter HKID"/>
                            </div>
                            <div className="form-group ">
                                <input type="text" value={props.ethAdd}  className="form-control" placeholder="Enter Ethereum address" />
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

    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        let length = 5;

        contract_.methods.getUserAppointmentListLength(account).call({from: account}, function(error, result){
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

    const makeRow = async (start) => {
        let temp_list = [];
        let temp = "a";
        for (let i = start ; i > start - pageLimit; i--){
            if (i < 0){
                break;
            } 
            
            // try{
            //     temp = await contract.methods.getProviderAppointmentList(i, account ).call({from: account}); 
            // }catch(error){
            //     console.log("Provider appointment does not exist.");
            // }
            //let temp = {"0": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c", "1": "01-02-21"};
            // 0 = patient address, 1 = date, 2 = encrypted patient info.
            contract.methods.getProviderAppointmentList(i, account ).call({from: account}, function(error, result){
                let ethAdd = "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c";
                let date = "01-02-21";
                let hkid = "M1238123";
                let name = "Ali";
                console.log("HELLO " + temp);


                if(temp !== ""){
                    temp_list.push(<AppointmentRow key={i} count={i} ethAdd={ethAdd} date={date} hkid={hkid} name={name} contract={contract} web3={web3}></AppointmentRow>)
                    console.log("que?");
                }
                setAppointmentList(temp_list);
                console.log("temp_list = "+ temp_list);


            })


            
            
        
            
        }


        

    }

    const clickNext = (e) => {
        e.preventDefault();
        let count = currentLimit - 5;
        if (count < 0){
            count = 0
        };
        makeRow(count);
        setCurrentLimit(count);
    }

    const clickPrev = (e) => {
        e.preventDefault();
        let count = currentLimit + 5;
        if (count >= appointmentLength){
            count = appointmentLength - 1;
        }
        makeRow(count);
        setCurrentLimit(count);
    
    }

    useEffect(() => {
        setup();
    }, [setupStatus])

    useEffect(() => {
        if(setupStatus){
            makeRow(appointmentLength - 1);
        }
        
    }, [setupStatus, appointmentLength])

    return (
        <div className="auth-inner"> 

                
            <h3 >Incoming Appointment</h3>

            <input name="text" className = "search-bar" type="text" placeholder="Search" />

            {appointmentList}
                
                
    

            <button onClick={clickPrev}>Previous</button>
            <button onClick={clickNext}>Next</button>
        </div>

    )
    


}

export default ProviderIncomingAppointment;
