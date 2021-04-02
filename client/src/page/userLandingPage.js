import React, { useState }  from "react";
import './landing.css';

import { Navigation } from "react-minimal-side-navigation";
import Icon from "awesome-react-icons";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const UserLandingPage = (props) => {

    // const goUserInfo = () => {
    //     console.log("test");
    // }

    // const goAppointment = () => {
    //     console.log("test2");
    // }

    // const goHistory = () => {
    //     console.log("test3");
    // }

    // return (

    //         <div id="userLandingPage">
    //             <div id="boxInfoOuter">
    //                 <div className="boxInfo" onClick={() => goUserInfo()}>
    //                     User
    //                 </div>
    //                 <div className="boxInfo" onClick={() => goAppointment()}>
    //                     Make Appointment
    //                 </div>
    //                 <div className="boxInfo" onClick={()=> goHistory()}> 
    //                     History
    //                 </div>
    //             </div> 
    //             <div>
    //                 <button type="submit">Latest test result</button>
    //                 <div>{/* page for covid ingo */}</div>
    //             </div>
    //         </div>


    // )

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    console.log (isSidebarOpen);

    return (
      <>
       <div className="auth-inner" style= {{ width: "1000px"}}> 
            <div
            onClick={() => setIsSidebarOpen(false)}
            className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          />

          <div class = "same-row">
              <div>
                <button
                  className="btn-menu"
                  onClick={(): void => isSidebarOpen? setIsSidebarOpen(false): setIsSidebarOpen(true)}
                  type="button"
                >
                  <Icon name="burger" className="w-6 h-6" />
                </button>
              </div>

              <button type="submit" className="btn btn-primary btn-block" style={{width: '20%', marginLeft:'40%'}} >Lastest Test Result</button>
            </div>
            {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
            isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
          }`}  style ={isSidebarOpen ? {display:"block"} : {display:"none"}}
          
    
        >

        <div className="flex items-center justify-center text-center py-6">
            <span className="mx-2 text-2xl font-semibold text-black">
              Foo Zhi Qian
            </span>
          </div>
          <div className="flex items-center justify-center text-center mb-3 " >
            <FontAwesomeIcon icon={faUserCircle} style = {{width:'100px', height: '100px'}}/>
          </div>

            <Navigation
                  // you can use your own router's api to get pathname
                  activeItemId="/management/members"
                  onSelect={({itemId}) => {
                    // maybe push to the route
                  }}
                  items={[
                    {
                      title: 'Make Appointment',
                      itemId: '/dashboard',
                      // you can use your own custom Icon component as well
                      // icon is optional
                      elemBefore: () => <Icon name="inbox" />,
                    },
                    {
                      title: 'History',
                      itemId: '/management',
                      elemBefore: () => <Icon name="users" />,
                    },
                  
                  ]}
                />

              

        </div>
      </div>
            
      </>
    );


}

export default UserLandingPage;


