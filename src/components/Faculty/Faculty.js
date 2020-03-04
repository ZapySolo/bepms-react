import React, {Component} from 'react';
import './faculty.css';
import logo from '../../assets/images/bepms-logo.png';
import FolderIcon from '../../assets/images/folder_icon.png';
import HomepageIcon from '../../homepage-logo.svg';
import SearchIcon from '../search.svg';

import FacultyReport from './FacultyReport/FacultyReport';
import FacultySetting from '../Setting/Setting';
import FacultyProject from './FacultyProject/FacultyProject';
import FacultyNotification from '../Notification/Notification';

class Faculty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            activeTab: 'home',
            searchTypeToggle:'currentSystem'
        };
    }

    renderComponent = () => {
        switch(this.state.activeTab){
            case 'home':
                return this.FacultyHome();
             
            case 'report':
                return <FacultyReport />;
              
            case 'setting':
                return <FacultySetting />;
              
            case 'project':
                return <FacultyProject />;
               
            case'notification':
                return <FacultyNotification />;
                
            default:
                return <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>This will render by default</div>;
        }
    }

    SideBar = ()=> {
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
                    {this.SelectSystem()}
                </div>
            </div>
        );
    }

    SelectSystem = ()=> {
        return (
            <>
                <div className="currentSystem">
                    <span className="your-current-system-text-f">Your Current System</span>
                    <div className="currentSystem_content_f">
                        <span className="current_system_title">Computer Department 2020</span>
                        <span className="current_system_position_name">Your Position: HOD</span>
                    </div>
                    <div className="currentSystem_content_f change_position">
                        <span className="change_position_text_f">Change Your Position</span>
                    </div>
                </div>
                <div className="currentSystem" style={{marginTop:20}}>
                    <span className="your-current-system-text-f">Other System</span>
                    <div className="currentSystem_content_f">
                        <div className="other_system_title">
                            <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                            <div className="otherSystemTitle">Computer Department 2021</div>
                        </div>
                    </div>
                    <div className="currentSystem_content_f">
                        <div className="other_system_title">
                            <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                            <div className="otherSystemTitle">Computer Department 2022</div>
                        </div>
                    </div>
                    <div className="currentSystem_content_f">
                        <div className="other_system_title">
                            <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                            <div className="otherSystemTitle">Computer Department 2023</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    FacultyHome = () => {

        let currentSystemClassName = (this.state.searchTypeToggle === 'currentSystem') ? 'search_active_toggle_f' : 'search_inactive_toggle_f';
        let allSystemClassName = (this.state.searchTypeToggle === 'allSystem') ? 'search_active_toggle_f' : 'search_inactive_toggle_f';
  
        return(
            <div style={{display:'flex', flexDirection:'row'}}>

                {this.SideBar()}

                <div className="desktop-home-select-system-f">
                    {this.SelectSystem()}
                </div>
                
                <div className="xvxbx">
                    <div className="toggle_search_wrapper_x">
                        <div className="drawer_toggle_home_f">
                            <span className="font30" onClick={()=>{this.setState({sideBarToggle: true})}}>&#9776;</span>
                        </div>
                        <div className="search_field-fs">
                            <div className="search-field-container-f">
                                <img src={SearchIcon} alt="s" style={{marginRight:'10px'}} />
                                <input className="search_input_f" type="text" name="Search" value="Search" style={{color:'#CBCBCB'}}/>
                            </div>
                            <div className="faculty_search_toggle card_rank">
                                <span 
                                    onClick={()=>{this.setState(({ searchTypeToggle: 'currentSystem'}))}}
                                    className={currentSystemClassName}>Current System</span>
                                <span 
                                    onClick={()=>{this.setState(({ searchTypeToggle: 'allSystem'}))}}
                                    className={allSystemClassName}>All System</span>
                            </div>
                        </div>
                    </div>
                    <div className="search_result">
                        <div className="project_result">
                            <span className="project_text_f">Projects</span>
                            <div className="project_result_container">
                                <div className="project card_rank">
                                    <div>
                                        <img src="https://source.unsplash.com/random/150x100"  alt="project_img" style={{borderRadius:5}} height='100' width='150' />
                                    </div>
                                    <div className="project-title-text-f">Hotel Booking</div>
                                    <div className="project-leader-text-f">Sakane Miko</div>
                                </div>
                                <div className="project card_rank">
                                    <div>
                                        <img src="https://source.unsplash.com/random/150x100"  alt="project_img" style={{borderRadius:5}} height='100' width='150' />
                                    </div>
                                    <div className="project-title-text-f">Hotel Booking</div>
                                    <div className="project-leader-text-f">Sakane Miko</div>
                                </div>
                                <div className="project card_rank">
                                    <div>
                                        <img src="https://source.unsplash.com/random/150x100"  alt="project_img" style={{borderRadius:5}} height='100' width='150' />
                                    </div>
                                    <div className="project-title-text-f">Hotel Booking</div>
                                    <div className="project-leader-text-f">Sakane Miko</div>
                                </div>
                            </div>
                        </div>
                        <div className="report_result">
                            <span className="project_text_f">Reports</span>
                            <div className="reports_result_container">

                                

                            <div className="report_x card_rank">
                                    <div className="report-wrapper-xzx">
                                        <div className="report-project-img">
                                            <img alt="project_img" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                        </div>

                                        <div className="report-description">
                                            <span className="report-project-name-text-f">Project Name<span className="report-project-name-text-f-date"> • date.now</span></span>
                                            <span className="report-leader-name-text-f">Leader Name</span>
                                            <span className="report-description-text-f">report descriptionreport descriptionreport descriptionreport description</span>
                                        </div>
                                        <div className="report_status_pending" />
                                    </div>
                                </div>

                                <div className="report_x card_rank">
                                    <div className="report-wrapper-xzx">
                                        <div className="report-project-img">
                                            <img alt="project_img" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                        </div>

                                        <div className="report-description">
                                            <span className="report-project-name-text-f">Project Name<span className="report-project-name-text-f-date"> • date.now</span></span>
                                            <span className="report-leader-name-text-f">Leader Name</span>
                                            <span className="report-description-text-f">report descriptionreport descriptionreport descriptionreport description</span>
                                        </div>
                                        <div className="report_status_pending" />
                                    </div>
                                </div>

                                <div className="report_x card_rank">
                                    <div className="report-wrapper-xzx">
                                        <div className="report-project-img">
                                            <img alt="project_img" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                        </div>

                                        <div className="report-description">
                                            <span className="report-project-name-text-f">Project Name<span className="report-project-name-text-f-date"> • date.now</span></span>
                                            <span className="report-leader-name-text-f">Leader Name</span>
                                            <span className="report-description-text-f">report descriptionreport descriptionreport descriptionreport description</span>
                                        </div>
                                        <div className="report_status_pending" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
            <div className="faculty-main">
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
                        <div className="logo-box" >
                            <div style={{height:'111px' , width:'111px', display:'flex', justifyContent:'center', alignItems:'center'}}><img src={logo} height="30" alt="bepms"/></div>
                        </div>
                        <div className="left-navigation-options">
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'home'})}}>
                                <img src={HomepageIcon} alt="Home" />
                                <span className="navigation_title"  >Homepage</span>
                            </div>
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'report'})}}>
                                <img  src={HomepageIcon} alt="Home" />
                                <span className="navigation_title" >Reports</span>
                            </div>
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'setting'})}}>
                                <img  src={HomepageIcon} alt="Home" />
                                <span className="navigation_title" >Setting</span>
                            </div>
                            <div className="navigation_icon_wrapper" onClick={()=>{this.setState({activeTab: 'notification'})}}>
                                <img  src={HomepageIcon} alt="home" />
                                <span className="navigation_title" >Notifications</span>
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


export default Faculty;
