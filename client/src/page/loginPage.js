import React, { useState}  from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default class LoginPage extends React.Component{
    
    state = {
        userRedirect: false,
        supplierRedirect: false,
        showUser: false,
        showProvider: false,
        showAll: true,
        username: '',
        password: '',
        private_key:'',
    }


    setUserRedirect = () => {
        this.setState({
          userRedirect: true,
        })
    }

    setSupplierRedirect = () => {
        this.setState({
          supplierRedirect: true,
        })
    }
    
    
    renderUserRedirect = () => {
        if (this.state.userRedirect) {
          return <Redirect to={"/user-landing-page"} />
        }
    }

    renderSupplierRedirect = () => {
        if (this.state.supplierRedirect) {
          return <Redirect to={"/provider-landing-page"} />
        }
    }
    

      MakeQuerablePromise = (promise) => {
        // Don't modify any promise that has been already modified.
        if (promise.isResolved) return promise;
    
        // Set initial state
        var isPending = true;
        var isRejected = false;
        var isFulfilled = false;
    
        // Observe the promise, saving the fulfillment in a closure scope.
        var result = promise.then(
            function(v) {
                isFulfilled = true;
                isPending = false;
                return v; 
            }, 
            function(e) {
                isRejected = true;
                isPending = false;
                throw e; 
            }
        );
    
        result.isFulfilled = function() { return isFulfilled; };
        result.isPending = function() { return isPending; };
        result.isRejected = function() { return isRejected; };
        return result;
    }

   

    loginUser = (e)=>{
        e.preventDefault();
        localStorage.setItem("user_type","user");
        localStorage.setItem("name", "test");
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("eth_address", "0x501a19d036cD7DA7E353AD194bA08642cD560978");
        localStorage.setItem("logged", true);
        localStorage.setItem("hkid", "m1234123");
        localStorage.setItem("private_key", this.state.private_key);

        var userJson = {
            username: this.state.username,
            password: this.state.password
        };
        var ipfsHash = "";
        const ipfsAPI = require('ipfs-api');
        const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

        var that = this;
        ipfs.add([Buffer.from(JSON.stringify(userJson))], {"only-hash": true}, function(err, res){
            if (err) throw err
            ipfsHash = res[0].hash;
            console.log("test hash");
            console.log(ipfsHash);
            if(ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user info from', url);


               
        //         const authentication = fetch(url).then(response => response.json());
        //         var myPromise = that.MakeQuerablePromise(authentication);
                
        //         // console.log("Initial fulfilled:", myPromise.isFulfilled());//false
        //         // console.log("Initial rejected:", myPromise.isRejected());//false
        //         // console.log("Initial pending:", myPromise.isPending());//true

        //         setTimeout(() => {
        //             if (myPromise.isPending()){
        //                 console.log("wrong authentication info")
        //             }else{
                        
        //                 console.log("success")
        //                 that.setUserRedirect();

                        
        //             }
    
        //         }, 2000);
                
        //         // myPromise.then(function(data){
        //         //     console.log(data); // "Yeah !"
        //         //     console.log("Final fulfilled:", myPromise.isFulfilled());//true
        //         //     console.log("Final rejected:", myPromise.isRejected());//false
        //         //     console.log("Final pending:", myPromise.isPending());//false
        //         // });
            
            

        //         // fetch(url)
        //         // .then(response => response.json())
        //         // .then((jsonData) => {
        //         //     // jsonData is parsed json object received from url
        //         //     if (jsonData["username"] == userJson.username && jsonData["password"] == userJson.password){
        //         //         console.log("authenticated");
        //         //         that.setRedirect();
        //         //     }
        //         //     else{
        //         //         console.log("none");
        //         //     }
                    
        //         // })
        //         // .catch((error) => {
        //         //     // handle your errors here
        //         //     console.error(error)
        //         // })
        //     }
        // })





    }

  
  



    loginProvider = (e) => {
        e.preventDefault();
        localStorage.setItem("user_type","provider");
        localStorage.setItem("name", "test2");
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("eth_address", "0x501a19d036cD7DA7E353AD194bA08642cD560978");
        localStorage.setItem("location", "xx");
        localStorage.setItem("email", "zxxc@porkmail.com");

        var userJson = {
            identity: "Supplier",
            username: this.state.username,
            password: this.state.password
        };
        var ipfsHash = "";
        const ipfsAPI = require('ipfs-api');
        const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

        var that = this;
        ipfs.add([Buffer.from(JSON.stringify(userJson))], {"only-hash": true}, function(err, res){
            if (err) throw err
            ipfsHash = res[0].hash;
            console.log("test hash");
            console.log(ipfsHash);
            if(ipfsHash != 'not-available') {
                var url = 'https://ipfs.io/ipfs/' + ipfsHash;
                console.log('getting user info from', url);


               
        //         const authentication = fetch(url).then(response => response.json());
        //         var myPromise = that.MakeQuerablePromise(authentication);
                
        //         // console.log("Initial fulfilled:", myPromise.isFulfilled());//false
        //         // console.log("Initial rejected:", myPromise.isRejected());//false
        //         // console.log("Initial pending:", myPromise.isPending());//true

        //         setTimeout(() => {
        //             if (myPromise.isPending()){
        //                 console.log("wrong authentication info")
        //             }else{
                        
        //                 console.log("success")
        //                 that.setSupplierRedirect();

                        
        //             }
    
        //         }, 2000);
                
        //         // myPromise.then(function(data){
        //         //     console.log(data); // "Yeah !"
        //         //     console.log("Final fulfilled:", myPromise.isFulfilled());//true
        //         //     console.log("Final rejected:", myPromise.isRejected());//false
        //         //     console.log("Final pending:", myPromise.isPending());//false
        //         // });
            
            

        //         // fetch(url)
        //         // .then(response => response.json())
        //         // .then((jsonData) => {
        //         //     // jsonData is parsed json object received from url
        //         //     if (jsonData["username"] == userJson.username && jsonData["password"] == userJson.password){
        //         //         console.log("authenticated");
        //         //         that.setRedirect();
        //         //     }
        //         //     else{
        //         //         console.log("none");
        //         //     }
                    
        //         // })
        //         // .catch((error) => {
        //         //     // handle your errors here
        //         //     console.error(error)
        //         // })
        //     }
        // })

    }

    openUser = (e) => {
        e.preventDefault();
        this.setState({
            showAll: false,
            showUser: true
        })
        
    }

    openProvider = (e) =>{
        e.preventDefault();
        this.setState({
            showAll: false,
            showProvider: true
        })
        
    }

    closeAll = (e) =>{
        e.preventDefault();
        this.setState({
            showUser: false,
            showProvider: false,
            showAll: true
        })
    }

    handleUserChanges = (e) =>{
        e.preventDefault();
        this.setState({
            username: e.target.value
        })
    }

     handlePasswordChanges = (e) =>{
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    handlePrivateKeyChange = (e) =>{
        e.preventDefault();
        this.setState({
            private_key: e.target.value
        })
    }



    // getAUser: function(instance, i) {
    //     var instanceUsed = instance;
    //         var username;
    //         var ipfsHash;
    //         var address;
    //         var userCardId = 'user-card-' + i;
    //     return instanceUsed.getUsernameByIndex.call(i).then(function(_username) {
    //     console.log('username:', username = web3.toAscii(_username), i);
                
    //           $('#' + userCardId).find('.card-title').text(username);
            
    //           return instanceUsed.getIpfsHashByIndex.call(i);
    //     }).then(function(_ipfsHash) {
    //     console.log('ipfsHash:', ipfsHash = web3.toAscii(_ipfsHash), i);
    //     // $('#' + userCardId).find('.card-subtitle').text('title');
    //     if(ipfsHash != 'not-available') {
    //             var url = 'https://ipfs.io/ipfs/' + ipfsHash;
    //             console.log('getting user info from', url);
    //     $.getJSON(url, function(userJson) {
    //     console.log('got user info from ipfs', userJson);
    //               $('#' + userCardId).find('.card-subtitle').text(userJson.title);
    //               $('#' + userCardId).find('.card-text').text(userJson.intro);
    //     });
    //           }
    //     return instanceUsed.getAddressByIndex.call(i);
            
    //         }).then(function(_address) {
    //     console.log('address:', address = _address, i);
              
    //           $('#' + userCardId).find('.card-eth-address').text(address);
    //     return true;
    //     }).catch(function(e) {
    //     // There was an error! Handle it.
    //           console.log('error getting user #', i, ':', e);
    //     });
    //     }

   


    render(){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">

            <Link className="navbar-brand" to={"/sign-in"}>Stay Home</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                
                    <li className="nav-item">

                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                    </li>
                    
                </ul>

            </div>
            </div>
        </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
            {this.state.showAll ? "" : <button id="back-button" onClick={(e) => this.closeAll(e)}> Back </button> }
            <form>
                <h3>Sign In As</h3> 
                
                
                {this.state.showAll ? 
                    <div >
                        <button type="submit" className="btn custom-button btn-block loginButton" onClick={(e) => this.openUser(e)} >
                             User
                        </button>

                        <button type="submit" className="btn custom-button btn-block loginButton" onClick={(e) => this.openProvider(e)}>
                            Supplier
                        </button>
                        {/* <button className="login-page-button-unit" onClick={(e) => this.openUser(e)}>
                            User
                        </button>
                        <button className="login-page-button-unit" onClick={(e) => this.openProvider(e)}>
                            Test Provider
                        </button> */}
                            
                        
                    </div>
                : "" }
                
                
                {this.state.showUser ?

                    <div id="user-login">
                        <h3>User</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username" value={this.state.username} onChange={(e) => this.handleUserChanges(e)}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={(e) => this.handlePasswordChanges(e)} />
                        </div>

                        <div className="form-group">
                            <label>Private Key</label>
                            <input type="text" className="form-control" placeholder="Enter private key" value={this.state.private_key} onChange={(e) => this.handlePrivateKeyChange(e)} />
                        </div>

                        
                        <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.loginUser(e)}>
                            <Link className="nav-link" to={"/user-landing-page"}>Submit</Link>
                        </button>
                    
                    </div>
                
                : ""}
                {this.renderUserRedirect()}
                {this.renderSupplierRedirect()}
                {this.state.showProvider ?
                
                    <div id="provider-login">
                        <h3>Provider</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username"  value={this.state.username} onChange={(e) => this.handleUserChanges(e)}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={(e) => this.handlePasswordChanges(e)} />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.loginProvider(e)}>
                            <Link className="nav-link" to={"/provider-landing-page"}>Submit</Link>
                        </button>
                        
                    </div>
                : ""}

            </form>
        </div>
        </div>
        </>
       
    );
 }
}
