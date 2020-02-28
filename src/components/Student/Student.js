import React, {Component} from 'react';
import './student.css';
import logo from '../../assets/images/bepms-logo.png';

import StudentReport from './StudentReport/StudentReport';
import StudentSetting from '../Setting/Setting';
import Notification from '../Notification/Notification';
import FolderIcon from '../../assets/images/folder_icon.png';
import HomepageIcon from '../../homepage-logo.svg';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            activeTab: 'home',
            sideBarWidth:'100vh'
        };
    }

    renderComponent = () => {
        switch(this.state.activeTab){
            case 'home':
                return this.FacultyHome();
             
            case 'report':
                return <StudentReport />;
              
            case 'setting':
                return <StudentSetting />;
               
            case'notification':
                return <Notification />;
                
            default:
                return <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>This will render by default</div>;
        }
    }

    ProgressBar = () => {
        let percentage = 70;

        return (
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                    root: {
                        height:'150px'
                    },
                    path: {
                        stroke: `rgba(46, 212, 122, 100)`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                        // Trail color
                        stroke: '#F7685B',
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Rotate the trail
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                        // Customize the text
                    text: {
                        // Text color
                        fill: '#000',
                        // Text size
                        fontSize: '16px',
                        
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                        fill: '#3e98c7',
                    },
                }}
            />
        );
    }

    SideBar = () => {
        let sidebarWidth = '100vw';

        if(window.innerWidth >= 450) {
            sidebarWidth = (!this.state.sideBarToggle)?'0px':'450px';
        } else {
            sidebarWidth = (!this.state.sideBarToggle)?'0px':'100vw';
        }
        
        return (
            <div className="sidenav" style={{width:sidebarWidth}}>
                <div className="sidebar_content">
                    <div href="#" className="closebtn" 
                        onClick={()=>{
                            this.setState({sideBarToggle: false});
                        }}>&times;</div>
                    <div className="currentSystem">
                        <span>Your Current Project</span>
                        <div className="currentSystem_content">
                            <span className="current_system_title">Medical Drone</span>
                            <span className="current_system_position_name">Your Position: Leader</span>
                        </div>
                    </div>
                    <div className="currentSystem" style={{marginTop:20}}>
                        <span>Other Project</span>
                        <div className="otherSystem_content">
                            <div className="other_system_title">
                                <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                                <div className="otherSystemTitle">Desmensia The Pilla manager</div>
                            </div>
                        </div>
                        <div className="otherSystem_content">
                            <div className="other_system_title">
                                <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                                <div className="otherSystemTitle">Mega Moga Manger</div>
                            </div>
                        </div>
                        <div className="otherSystem_content">
                            <div className="other_system_title">
                                <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                                <div className="otherSystemTitle">I ran Out of names manager</div>
                            </div>
                        </div>
            
                    </div>
                </div>
            </div>
        );
    }

    FacultyHome = () => {
       

        return(
            <>
                <div className="toggle_search_wrapper">
                    <div className="drawer_toggle" style={{flexDirection:'row', justifyContent:'flex-start', width:'100%'}}>
                        <span className="font30" onClick={()=>{this.setState({sideBarToggle: true})}}>&#9776;</span>
                    </div>
                </div>
                <div className="current-project-details">
                    <div className="project-image">
                        <div className="cover-image-padd" style={{height:'170px', width:'100%'}}>
                            <img src="https://source.unsplash.com/random/400x200" style={{objectFit:"cover"}} height="170px" width="100%" alt="profile" />
                        </div>
                    </div>
                    <div className="project-options">
                        <div>
                            <div className="project-profile-img">
                                <img className="project-profile-img-element" src="https://source.unsplash.com/random/100x100" alt="profile" />
                            </div>
                        </div>
                        <div className="card_rank project-options-elements">
                            <div className="project-action">
                                <span className="project-action-text">Attachments</span>
                            </div>
                            <div className="project-action">
                                <span className="project-action-text">To-Do</span>
                            </div>
                            <div className="project-action">
                                <span className="project-action-text">More</span>
                            </div>
                        </div>
                    </div>
                    <div className="project-section-2">
                        <div className="project-header">
                            <span className="project-title-text">Medical Drone</span>
                        </div>

                        <div className="project-description-rank card_rank">
                            <div className="project-description-key">
                                <span className="project-description-key-text">Description</span>
                            </div>
                            <div className="project-description-value">
                                <span className="project-description-value-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                            </div>
                        </div>

                        <div className="project-description-rank card_rank">
                            <div className="project-description-key">
                                <span className="project-description-key-text">Project Status</span>
                            </div>
                            <div className="project-description-value">
                                {this.ProgressBar()}
                            </div>
                        </div>

                        <div className="project-member-rank card_rank">

                            <div className="project-description-key">
                                <span className="project-description-key-text">Members</span>
                            </div>

                            <div className="project-description-value project-member-value">
                                <div className="member-profie">
                                    <div className="member-detail">
                                        <img src="https://source.unsplash.com/random/200x200" alt="member-propfile" className="member-profile-img" />
                                        <span style={{marginLeft:10}} >Jayesh Nautiya</span>
                                    </div>
                                    <div className="member-position">
                                        <span className="project-description-value-text">Leader</span>
                                    </div>
                                </div>

                                <div className="member-profie mt10">
                                    <div className="member-detail">
                                        <img src="https://source.unsplash.com/random/200x200" alt="member-propfile" className="member-profile-img" />
                                        <span style={{marginLeft:10}} >Jayesh Nautiya</span>
                                    </div>
                                    <div className="member-position">
                                        <span className="project-description-value-text">Member</span>
                                    </div>
                                </div>
                
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    render() {
        return (
            <>
            {this.SideBar()}
            <div className="main-mobile">
                <div className="banner">
                    <div className="icon_wrapper">
                        <img src={logo} height="30" alt="bepms"/>
                    </div>
                </div>
                <div className="navigation_mobile">
                    <div className="navigation">
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'home'})}}>Home</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'report'})}}>Report</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'setting'})}}>Setting</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'notification'})}}>Notif</div>
                    </div>
                </div>
                <div className="content">
                    {this.renderComponent()}
                </div>
            </div>

            <div className="main-tablet">
                <div className="left-navigator">
                    <div className="tablet-logo">
                        <div>BEPMS</div>
                    </div>
                    <div className="left-navigation-options">
                        <img style={{marginTop:30}} src={HomepageIcon} onClick={()=>{this.setState({activeTab: 'home'})}} />
                        <img style={{marginTop:30}} src={HomepageIcon} onClick={()=>{this.setState({activeTab: 'report'})}}/>
                        <img style={{marginTop:30}} src={HomepageIcon} onClick={()=>{this.setState({activeTab: 'setting'})}}/>
                        <img style={{marginTop:30}} src={HomepageIcon} onClick={()=>{this.setState({activeTab: 'notification'})}}/>
                    </div>
                </div>
                <div className="right-main">
                    <div className="tablet-banner">
                        
                    </div>
                    <div className="content-tablet">
                        {this.renderComponent()}
                    </div>

                </div>

            </div>
            </>
        );
    }
}


export default Student;
