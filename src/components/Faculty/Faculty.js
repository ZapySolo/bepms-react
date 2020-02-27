import React, {Component} from 'react';
import './faculty.css';
import logo from '../../assets/images/bepms-logo.png';
import FolderIcon from '../../assets/images/folder_icon.png';

import FacultyReport from './FacultyReport/FacultyReport';
import FacultySetting from '../Setting/Setting';
import FacultyProject from './FacultyProject/FacultyProject';
import FacultyNotification from '../Notification/Notification';

class Faculty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarToggle: false,
            activeTab: 'home'
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

    FacultyHome = () => {
        let sidebarWidth = (!this.state.sideBarToggle)?'0px':'100vw';
  
        return(
            <>
                <div className="sidenav" style={{width:sidebarWidth}}>
                    <div className="sidebar_content">
                        <div href="#" className="closebtn" onClick={()=>{this.setState({sideBarToggle: false})}}>&times;</div>
                        <div className="currentSystem">
                            <span>Your Current System</span>
                            <div className="currentSystem_content">
                                <span className="current_system_title">Computer Department 2020</span>
                                <span className="current_system_position_name">Your Position: HOD</span>
                            </div>
                            <div className="currentSystem_content change_position">
                                <span>Change Your Position</span>
                            </div>
                        </div>
                        <div className="currentSystem" style={{marginTop:20}}>
                            <span>Other System</span>
                            <div className="otherSystem_content">
                                <div className="other_system_title">
                                    <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                                    <div className="otherSystemTitle">Computer Department 2021</div>
                                </div>
                            </div>
                            <div className="otherSystem_content">
                                <div className="other_system_title">
                                    <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                                    <div className="otherSystemTitle">Computer Department 2022</div>
                                </div>
                            </div>
                            <div className="otherSystem_content">
                                <div className="other_system_title">
                                    <div className="folderIconContainer"><img src={FolderIcon} alt="folder_icon" height="28" /></div>
                                    <div className="otherSystemTitle">Computer Department 2023</div>
                                </div>
                            </div>
             
                        </div>
                    </div>
                </div>
                <div className="toggle_search_wrapper">
                    <div className="drawer_toggle">
                        <span className="font30" onClick={()=>{this.setState({sideBarToggle: true})}}>&#9776;</span>
                    </div>
                    <div className="search_field">
                        <div className="search-field-container">
                            <input className="search_input" type="text" name="Search" value="Search" style={{color:'#CBCBCB'}}/>
                        </div>
                        <div className="card_rank" style={{backgroundColor:'#F5F8FA', padding:5, borderRadius:5, width:150, display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <span style={{fontSize:10, backgroundColor:'white', marginRight:5, padding:5}}>Current System</span>
                            <span style={{fontSize:10,padding:5,color:'#CBCBCB'}}>All System</span>
                        </div>
                    </div>
                </div>
                <div className="search_result">
                    <div className="project_result">
                        <span>Projects</span>
                        <div className="project_result_container">
                            <div className="project card_rank">
                                <div>
                                    <img src="https://source.unsplash.com/random/150x100"  alt="project_img" style={{borderRadius:5}} height='100' width='150' />
                                </div>
                                <div className="project-title-text">Hotel Booking</div>
                                <div className="project-leader-text">Sakane Miko</div>
                            </div>
                            <div className="project card_rank">
                                <div>
                                    <img src="https://source.unsplash.com/random/150x100"  alt="project_img" style={{borderRadius:5}} height='100' width='150' />
                                </div>
                                <div className="project-title-text">Hotel Booking</div>
                                <div className="project-leader-text">Sakane Miko</div>
                            </div>
                            <div className="project card_rank">
                                <div>
                                    <img src="https://source.unsplash.com/random/150x100"  alt="project_img" style={{borderRadius:5}} height='100' width='150' />
                                </div>
                                <div className="project-title-text">Hotel Booking</div>
                                <div className="project-leader-text">Sakane Miko</div>
                            </div>
                        </div>
                    </div>
                    <div className="report_result">
                        <span>Reports</span>
                        <div className="reports_result_container">
                            <div className="report card_rank">
                                <div className="report-project-img">
                                    <img alt="project_img" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                </div>
                                <div className="report-description">
                                    <span className="report-project-name-text">Project Name</span>
                                    <span className="report-leader-name-text">Leader Name</span>
                                    <span className="report-description-text">report descriptionreport descriptionreport descriptionreport description</span>
                                </div>
                                <div className="report_status_pending" />
                            </div>
                            <div className="report card_rank">
                                
                                <div className="report-project-img">
                                    <img alt="project_image" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                </div>
                                <div className="report-description">
                                    <span className="report-project-name-text">Project Name</span>
                                    <span className="report-leader-name-text">Leader Name</span>
                                    <span className="report-description-text">report descriptionreport descriptionreport descriptionreport description</span>
                                </div>
                                <div className="report_status_pending" />
                            </div>
                            <div className="report card_rank">
                                
                                <div className="report-project-img">
                                    <img alt="project_image" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                </div>
                                <div className="report-description">
                                    <span className="report-project-name-text">Project Name</span>
                                    <span className="report-leader-name-text">Leader Name</span>
                                    <span className="report-description-text">report descriptionreport descriptionreport descriptionreport description</span>
                                </div>
                                <div className="report_status_pending" />
                            </div>
                            <div className="report card_rank">
                                
                                <div className="report-project-img">
                                    <img alt="project_image" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                </div>
                                <div className="report-description">
                                    <span className="report-project-name-text">Project Name</span>
                                    <span className="report-leader-name-text">Leader Name</span>
                                    <span className="report-description-text">report descriptionreport descriptionreport descriptionreport description</span>
                                </div>
                                <div className="report_status_pending" />
                            </div>
                            <div className="report card_rank">
                                
                                <div className="report-project-img">
                                    <img alt="project_image" src="https://source.unsplash.com/random/40x40" height="40" width="40" style={{borderRadius:20}} />
                                </div>
                                <div className="report-description">
                                    <span className="report-project-name-text">Project Name</span>
                                    <span className="report-leader-name-text">Leader Name</span>
                                    <span className="report-description-text">report descriptionreport descriptionreport descriptionreport description</span>
                                </div>
                                <div className="report_status_pending" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="main">
                <div className="banner"> 
                    <div className="icon_wrapper">
                        <img src={logo} height="30" alt="bepms"/>
                    </div>
                </div>
                <div className="navigation_mobile">
                    <div className="navigation">
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'home'})}}>Home</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'report'})}}>Report</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'project'})}}>Project</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'setting'})}}>Setting</div>
                        <div className="navigation_button" onClick={()=>{this.setState({activeTab: 'notification'})}}>Notif</div>
                    </div>
                </div>
                <div className="content">
                    {this.renderComponent()}
                </div>
            </div>
        );
    }
}


export default Faculty;
