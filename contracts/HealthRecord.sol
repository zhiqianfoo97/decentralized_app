// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <=0.8.3;

contract HealthRecord{
    
    address private contractOwner;
    
    struct UserResult{
        string testResult;
        string date;
        string placeName;
        string location;
    }
    
    struct PendingTransaction{
        UserResult result;
        bool paid;
        uint256 amount;
        address payableTo;
        
    }

    
    struct AppointmentListUser{
        string provName;
        string provLocation;
        string date;
    }
    
    struct AppointmentListProvider{
        address patient;
        string date;
        string encryptedUserInfo;
    }
    
    
    struct History{
        address patientAddress;
        string date;
    }
    
    
    struct ProviderUser{
        address userAddress;
        string location;
        string placeName;
        bool isActive;
        History[] historyList;
        AppointmentListProvider[] appointmentList;
        string encryptedLogin;
        string encryptedInfo;
        string publicKey;
        
    }
    
    struct User{
        address userAddress;
        UserResult[] results;
        PendingTransaction[] pendingResult;
        AppointmentListUser[] appointmentList;
        string encryptedLogin;
        string encryptedInfo;
        string publicKey;
        bool isActive;
    }
    
    
    ProviderUser[] private hospitalList; // just a list 
    mapping (string => string) private loginInfo;
    mapping (address => ProviderUser) private provider;
    mapping (address  => User) private users; // maybe change to private
    
    
    constructor (){
        contractOwner = msg.sender;
    }
    
    event Loggin(address sender_, bool isActive);
    
    function putLoginInfo(string memory passHash_, string memory infoHash_) public{
        loginInfo[passHash_] = infoHash_;
    }
    
    
    function getLoginInfo(string memory hash_) public view returns(string memory){
        return(loginInfo[hash_]);   
    }
    
    
    //add users
    function registerUser(address user_, string memory pKey,  string memory encryptedLogin_, string memory encryptedInfo_) public{
       // require(msg.sender == user_);
        users[user_].userAddress = user_;
        users[user_].publicKey = pKey;
        users[user_].encryptedLogin = encryptedLogin_;
        users[user_].encryptedInfo = encryptedInfo_;
        users[user_].isActive = true;
            }
    
    function getUserEncrypted(address user_) public view returns(string memory, string memory){
        
        return(
            users[user_].encryptedLogin,
            users[user_].encryptedInfo);
    }
    
    function getUserPublicKey(address user_) public view returns(string memory){
        return(users[user_].publicKey);
    }
    
    function getProviderPublicKey(address user_) public view returns(string memory){
        return(provider[user_].publicKey);
    }
    
    function userMakeAppointment(string memory venue_, string memory location_, string memory date_, address provider_, string memory encryptedUserInfo_) public{
        require(users[msg.sender].isActive);
        AppointmentListUser memory appoint_ = AppointmentListUser(venue_, location_, date_);
        users[msg.sender].appointmentList.push(appoint_);
        AppointmentListProvider memory appointProv_ = AppointmentListProvider(msg.sender, date_, encryptedUserInfo_);
        provider[provider_].appointmentList.push(appointProv_);
        
    }
    
    function getUserAppointmentList(uint count_, address users_) public view returns (string memory, string memory, string memory){
        require(msg.sender == users_, "You can only view your own info.");
        return(
            users[users_].appointmentList[count_].provName,
            users[users_].appointmentList[count_].provLocation,
            users[users_].appointmentList[count_].date
            );
    }
    
    function getProviderAppointmentList(uint count_, address provider_) public view returns(address, string memory, string memory){
        require(msg.sender == provider_,  "You can only view your own info.");
        return(
            provider[provider_].appointmentList[count_].patient,
            provider[provider_].appointmentList[count_].date,
            provider[provider_].appointmentList[count_].encryptedUserInfo
            
            );
    }
    
    
    function getUserAppointmentListLength(address users_) public view returns(uint256){
        require(msg.sender == users_, "You can only view your own info.");
        return(
            users[users_].appointmentList.length
            );
        
    }
    
    function getProviderAppointmentListLength(address provider_) public view returns(uint256){
        require(msg.sender == provider_, "You can only view your own info.");
        return(
            provider[provider_].appointmentList.length
            );
    }
    
    
    function getProviderHistoryList(uint256 count_, address provider_) public view returns(address , string memory){
        require(msg.sender == provider_, "You can only view your own info.");
        return(
            provider[provider_].historyList[count_].patientAddress,
            provider[provider_].historyList[count_].date
            );
    }
    
    function getProviderHistoryListLength(address provider_) public view returns(uint256){
        require(msg.sender == provider_, "You can only view your own info.");
        return(
            provider[provider_].historyList.length
            );
    }
    
    
    function registerKiosk(address kiosk_, string memory location_, string memory name_, string memory pKey, string memory encryptedLogin_) public{
        require(msg.sender == contractOwner, "Only contract owner can do this.");
        provider[kiosk_].userAddress = kiosk_;
        provider[kiosk_].location = location_;
        provider[kiosk_].placeName = name_;
        provider[kiosk_].isActive = true;
        provider[kiosk_].encryptedLogin = encryptedLogin_;
        provider[kiosk_].publicKey = pKey;
    }
    
    function registerHospital(address hospital_, string memory location_, string memory name_, string memory pKey, string memory encryptedLogin_) public{
        require(msg.sender == contractOwner, "Only contract owner can do this.");
        provider[hospital_].userAddress = hospital_;
        provider[hospital_].location = location_;
        provider[hospital_].placeName = name_;  
        provider[hospital_].isActive = true;
        provider[hospital_].publicKey = pKey;
        provider[hospital_].encryptedLogin = encryptedLogin_;
        hospitalList.push(provider[hospital_]);
    }
    
    function getProviderEncryptedLogin(address provider_) public view returns(string memory){
        return(
            provider[provider_].encryptedLogin
            );
    }
    
    
    function disableProvider(address provider_) public{
        require(msg.sender == contractOwner, "Only contract owner can do this.");
        provider[provider_].isActive = false;
    }
  
    
    function getProviderInfo(address provider_) public view returns(string memory, string memory, string memory){
        require(provider[provider_].isActive);
        return(
            provider[provider_].placeName,
            provider[provider_].location,
            provider[provider_].publicKey
            );
        
    }

    
    //add transaction 
    function addPendingHealthRecord(string memory testResult_, string memory date_, string memory placeName_ ,string memory place_ , address endUser, uint256 amount_) public{
        require(provider[msg.sender].isActive == true );
        UserResult memory resultData = UserResult(testResult_,placeName_, date_, place_);
        PendingTransaction memory pendingResult_ = PendingTransaction(resultData, false, amount_, msg.sender);
        users[endUser].pendingResult.push(pendingResult_);
        provider[msg.sender].historyList.push(History(endUser, date_));
        

    }
    
    function updatePendingHealthRecord(address user_, bool paidStatus_, uint256 count_ ) public{
        users[user_].pendingResult[count_].paid = paidStatus_;
    }
    
    //get record as user
    function getPendingHealthRecord(uint count_, address user_) public view returns(string memory, string memory,string memory, string memory, uint256, bool, address  ){
        require(msg.sender == user_);
        return (users[user_].pendingResult[count_].result.testResult, 
                users[user_].pendingResult[count_].result.date , 
                users[user_].pendingResult[count_].result.placeName,
                users[user_].pendingResult[count_].result.location,
                users[user_].pendingResult[count_].amount,
                users[user_].pendingResult[count_].paid,
                users[user_].pendingResult[count_].payableTo
                
        );
    }
    
    
    function getPendingHealthRecordLength (address user_) public view returns (uint256){
        require(msg.sender == user_);
        return(users[user_].pendingResult.length);
    }
    
    function getHospitalListLength() public view returns(uint256){
        
        return(
            hospitalList.length
            );
    }
    
    function getHospitalList(uint256 count_) public view returns(address, string memory, string memory, string memory){
        
        return(
            hospitalList[count_].userAddress,
            hospitalList[count_].placeName,
            hospitalList[count_].location,
            hospitalList[count_].publicKey
            );
    }
    
    
     function getOwner() public view returns(address){
        return(contractOwner);
    }    
    
    
    
}