import React, { useState, useEffect }  from "react";
import getWeb3 from "../getWeb3";
import HealthRecord from "../contracts/HealthRecord.json";

const HistoryRow = (props) => {
    return(
        <div className = "column_container">
            <div className="form-group border-bottom">
                <label>Ethereum Address: {props.userAddress} </label> 
                <label>Date: {props.date} </label> <br></br>
            </div>
        </div>
    )
}


const ProviderHistory = (props) => {
    const [pageLimit, setPageLimit] = useState(5);
    const [setupStatus, setSetupStatus] = useState(false);
    const [resultRow, setResultRow] = useState("");
    const [currentLimit, setCurrentLimit] = useState(0);
    const [historyLength, setHistoryLength] = useState(6);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(localStorage.getItem("eth_address"));

    const setup = async () => {
        const web3_ = await getWeb3();
        setWeb3(web3_);
        let networkID = await web3_.eth.net.getId();
        const deployedNetwork = HealthRecord.networks[networkID];
        let contract_ = new web3_.eth.Contract(HealthRecord.abi, deployedNetwork.address);
        let length = 0;

        contract_.methods.getProviderHistoryListLength(account).call({from: account}, function(error, result){
            setHistoryLength(result);
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
        let temp = "";
        for (let i = start ; i > start - pageLimit; i--){
            if (i < 0){
                break;
            } 
            
            try{
                temp = await contract.methods.getProviderHistoryList(i, account ).call({from: account}); 
            }catch(error){
                console.log("Provider history does not exist.");
            }finally{
                if(temp !== ""){
                    temp_list.push(<HistoryRow key={i} userAddress={temp["0"]} date={temp["1"]}></HistoryRow>)
                }

            }
            //let temp = {"0": "0x6e70cdAf8049D1FDfAC7f31DD1eeC3517d50E75c", "1": "01-02-21"};
            // 0 = patient address, 1 = date

            
            
        
            
        }
        setResultRow(temp_list);
    }

    const clickNext = (e) => {
        e.preventDefault();
        let count = currentLimit - 5;
        if (count < 0){
            count = 0
        };
        setupHistory(count);
        setCurrentLimit(count);
    }

    const clickPrev = (e) => {
        e.preventDefault();
        let count = currentLimit + 5;
        if (count >= historyLength){
            count = historyLength - 1;
        }
        setupHistory(count);
        setCurrentLimit(count);
    
    }

    useEffect(() => {
        setup();
    }, [setupStatus])

    useEffect(() =>{
        if(setupStatus){
            setupHistory(historyLength - 1);
        }
        
    }, [setupStatus, historyLength])

       return (

            <div className="auth-inner"> 
                <form>
                    <h3 >History</h3>

                    {resultRow}

                    
                </form>

                <button onClick={clickPrev}>Previous</button>
                <button onClick={clickNext}>Next</button>
             </div>
    )
}

export default ProviderHistory;