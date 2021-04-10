import React, { useState }  from "react";
import './landing.css';

import { Navigation } from "react-minimal-side-navigation";
import Icon from "awesome-react-icons";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class MyComponent extends React.Component {
  state = {
    redirect: false,
    isSidebarOpen: true,
    itemId: ""
  }

  setIsSidebarOpen = (arg) =>{
      console.log(arg);
    this.setState({
        isSidebarOpen: arg
      })
  }

  setRedirect = (itemId) => {
    this.setState({
      redirect: true,
      itemId: itemId
    })
  }

  renderRedirect = (itemId) => {
    if (this.state.redirect) {
        console.log(this.state.itemId)
      return <Redirect to={this.state.itemId} />
    }
  }
  
  render () {
    return (
        <div className="auth-inner" style= {{ width: "1000px"}}> 
          <div
          onClick={() => this.setIsSidebarOpen(false)}
          className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
            this.state.isSidebarOpen ? "block" : "hidden"
          }`}
        />

        <div className = "same-row">
            <div>
              <button
                className="btn-menu"
                onClick={(): void => this.state.isSidebarOpen? this.setIsSidebarOpen(false): this.setIsSidebarOpen(true)}
                type="button"
              >
                <Icon name="burger" className="w-6 h-6" />
              </button>
            </div>

            
          </div>

          {this.renderRedirect()}
          {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
            this.state.isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}  style ={this.state.isSidebarOpen ? {display:"block"} : {display:"none"}}
        
  
      >

      <div className="flex items-center justify-center text-center py-6">
          <span className="mx-2 text-2xl font-semibold text-black">
            {sessionStorage.getItem("name")}
          </span>
        </div>
        <div className="flex items-center justify-center text-center mb-3 " >
          <FontAwesomeIcon icon={faUserCircle} style = {{width:'100px', height: '100px'}}/>
        </div>
          <Navigation
                // you can use your own router's api to get pathname
                activeItemId="home/management/members"
                onSelect={({itemId}) => 
                  // maybe push to the route   
                  this.setRedirect(itemId)
                }

                items={[
                  {
                    title: 'Appointments',
                    itemId: '/provider-incoming-appointment-page',
                    // you can use your own custom Icon component as well
                    // icon is optional
                    elemBefore: () => <Icon name="inbox" />,
                  },
                  {
                    title: 'History',
                    itemId: '/provider-history',
                    elemBefore: () => <Icon name="activity" />,
                  },
                
                ]}
              />

           

      </div>
    </div>

    )
  }





  

}


