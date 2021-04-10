// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

contract HealthRecord{
    
    address private contractOwner;
    
    struct UserResult{
        string testResult;
        string date;
        string place;
    }
    
    struct PendingTransaction{
        UserResult result;
        bool paid;
        uint256 amount;
        address payableTo;
    }
    
    struct User{
        address userAddress;
        UserResult[] results;
        PendingTransaction[] pendingResult;
    }
    
    struct KioskUser{
        address userAddress;
        string placeName;
        bool isActive;
        
    }
    
    struct HospitalUser{
        address userAddress;
        string placeName;
        bool isActive;
    }
    
    HospitalUser[] hospitalList; // just a list 
    mapping (address => HospitalUser) public hospital;
    mapping (address => KioskUser) public kiosk;
    mapping (address  => User) public users; // maybe change to private
    
    
    constructor (){
        contractOwner = msg.sender;
    }
    
    //add users
    function registerUser() public{
        users[msg.sender].userAddress = msg.sender;
        
    }
    
    
    function registerKiosk(address kiosk_, string memory place_) public{
        require(msg.sender == contractOwner, "Only contract owner can do this.");
        kiosk[kiosk_].userAddress = kiosk_;
        kiosk[kiosk_].placeName = place_;
        kiosk[kiosk_].isActive = true;
    }
    
    function registerHospital(address hospital_, string memory place_) public{
        require(msg.sender == contractOwner, "Only contract owner can do this.");
        HospitalUser memory hUser = HospitalUser(hospital_, place_, true);
        hospital[hospital_] = hUser;
        hospitalList.push(hUser);
    }
    
    function disableKiosk(address kiosk_) public{
        require(msg.sender == contractOwner, "Only contract owner can do this.");
        kiosk[kiosk_].isActive = false;
    }
    
    function disableHospital(address hospital_) public{
        require(msg.sender == contractOwner, "Only contract owner can do this.");
        hospital[hospital_].isActive = false;
        // remove from hospital list 
    }
    
    //add record as kiosk
    function addHealthRecord(address endUser, string memory testresult_, string memory temp_, string memory place_) public{
        require(kiosk[msg.sender].isActive == true);
        UserResult memory result_ = UserResult(testresult_, temp_, place_);
        users[endUser].results.push(result_);
    }
    
    //get record as user
    function getHealthRecord(uint count_ , address user_) public view returns(string memory , string memory){
        return (users[user_].pendingResult[count_].result.testResult, users[user_].pendingResult[count_].result.place );
    }
    
    
    //add transaction 
    function addPendingHealthRecord(string memory testResult_, string memory date_, string memory place_ , address endUser, uint256 amount_) public{
        require(kiosk[msg.sender].isActive == true || hospital[msg.sender].isActive == true);
        UserResult memory resultData = UserResult(testResult_, date_, place_);
        PendingTransaction memory pendingResult_ = PendingTransaction(resultData, false, amount_, msg.sender);
        users[endUser].pendingResult.push(pendingResult_);
        

    }
    
    //get record as user
    function getPendingHealthRecord(uint count_, address user_) public view returns(string memory, string memory, bool, uint256){
        return (users[user_].pendingResult[count_].result.testResult, 
                users[user_].pendingResult[count_].result.date , 
                users[user_].pendingResult[count_].paid, 
                users[user_].pendingResult[count_].amount
        );
    }
    
    

    
    //triggers when user paid authority from web3js
    function payTransaction(uint entryNum) public payable{

        users[msg.sender].pendingResult[entryNum].paid = true;
        users[msg.sender].results[entryNum] = users[msg.sender].pendingResult[entryNum].result;
    }
    
    
    function getOwner() public view returns (address){
        return(contractOwner);
    }
    
    
    
    
    
}