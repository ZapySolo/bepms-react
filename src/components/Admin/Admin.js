
import React, { Component } from 'react';
import './admin.css';

import HomepageIcon from '../../homepage-logo.svg';
import logo from '../../assets/images/bepms-logo.png';

import Settings from '../Setting/Setting';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminSystem from './AdminSystem/AdminSystem';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'system'
        };
    }

    renderComponent = () => {
        switch(this.state.activeTab){
            case 'home':
                return <AdminDashboard />;
             
            case 'system':
                return <AdminSystem />;
              
            case 'setting':
                return <Settings />;

            default:
                return <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>This will render by default</div>;
        }
    }

    AdminSystem = ()=>{
        return (
            <div>Admin Systems</div>
        );
    }

    render() {
        return (
            <>
            <div className="mobile-view">Admin Panel cannot be viewed in mobile configuration.</div>
            <div className="main-tablet">
                <div className="left-navigator">
                    <div className="logo-box" >
                        <div className="logo-tcss" ><img src={logo} height="30" alt="bepms"/></div>
                    </div>
                    <div className="left-navigation-options">
                        <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'home'})}}>
                            <img src={HomepageIcon}  alt="img" />
                            <span className="navigation_title">Dashboard</span>
                        </div>
                        <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'system'})}}>
                            <img  src={HomepageIcon} alt="img" />
                            <span className="navigation_title">Systems</span>
                        </div>
                        <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'setting'})}}>
                            <img  src={HomepageIcon} alt="img" />
                            <span className="navigation_title">Setting</span>
                        </div>
                    </div>
                </div>

                <div className="right-main">
                    <div className="tablet-banner">
                
                    </div>
                    <div className="content-tablet" style={{height:window.innerHeight-111, overflow:'scroll'}}>
                        
                        {this.renderComponent()}
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Admin;
